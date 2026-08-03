import { useMemo, useState, type ReactNode } from 'react'
import {
  Anchor,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
} from 'antd'
import type { FormInstance } from 'antd'
import type { ZodTypeAny } from 'zod'
import type { ActionDef, FormFieldDef, FormSectionDef } from '../types'
import { PageHeader } from '../components/PageHeader'
import { SectionCard } from '../components/Panels'
import { layout, palette } from '../theme/tokens'

/**
 * T05 — ADD / EDIT FORM
 *
 * Create or edit a record through structured, grouped sections.
 *
 * Variants:
 *   page    — full page, many sections (default for entity creation)
 *   drawer  — ≤ 2 sections, contextual creation without losing the parent
 *   modal   — ≤ 6 fields only
 *
 * Ref: 03_PAGE_TEMPLATES.md §16
 */

const { TextArea } = Input

/**
 * Bridges a shared Zod schema to Ant Design's validator API.
 *
 * The SAME schema validates here and (later) in Express — it is not
 * reimplemented. Ref: 03_PAGE_TEMPLATES.md §24
 */
export function zodValidate(schema: ZodTypeAny, values: unknown) {
  const result = schema.safeParse(values)
  if (result.success) return { ok: true as const, data: result.data }
  return {
    ok: false as const,
    errors: result.error.issues.map((issue) => ({
      name: issue.path as (string | number)[],
      errors: [issue.message],
    })),
  }
}

/**
 * Ant Design's Form.Item clones its direct child, injecting `value` and
 * `onChange`. FieldControl IS that child, so it must accept and forward them —
 * otherwise every control is uncontrolled and never reaches form state.
 */
function FieldControl({
  field,
  value,
  onChange,
  ...injected
}: {
  field: FormFieldDef
  value?: unknown
  onChange?: (v: unknown) => void
}) {
  if (field.render) return <>{field.render({ value, onChange })}</>

  const common = {
    placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`,
    disabled: field.disabled,
    value: value as never,
    onChange: onChange as never,
    ...injected,
  }

  switch (field.type) {
    case 'textarea':
      return <TextArea {...common} rows={field.rows ?? 3} maxLength={field.maxLength} showCount={!!field.maxLength} />
    case 'number':
      return <InputNumber {...common} style={{ width: '100%' }} />
    case 'money':
      return (
        <InputNumber
          {...common}
          style={{ width: '100%' }}
          prefix="₹"
          min={0}
          precision={2}
          // Indian digit grouping while typing.
          formatter={(v) => (v === undefined || v === null ? '' : Number(v).toLocaleString('en-IN'))}
          parser={((v?: string) => Number((v ?? '').replace(/[^\d.]/g, ''))) as never}
        />
      )
    case 'select':
      return <Select {...common} allowClear showSearch optionFilterProp="label" options={field.options} />
    case 'multiselect':
      return (
        <Select
          {...common}
          mode="multiple"
          allowClear
          optionFilterProp="label"
          maxTagCount="responsive"
          options={field.options}
        />
      )
    case 'date':
      return <DatePicker {...common} style={{ width: '100%' }} format="DD MMM YYYY" />
    case 'datetime':
      return (
        <DatePicker {...common} style={{ width: '100%' }} showTime format="DD MMM YYYY, hh:mm A" />
      )
    case 'switch':
      return <Switch {...injected} checked={Boolean(value)} onChange={onChange as never} disabled={field.disabled} />
    case 'checkbox':
      return (
        <Checkbox {...injected} checked={Boolean(value)} onChange={onChange as never} disabled={field.disabled}>
          {field.help}
        </Checkbox>
      )
    case 'radio':
      return (
        <Radio.Group
          {...common}
          options={field.options}
          disabled={field.disabled}
          optionType="button"
        />
      )
    default:
      return (
        <Input
          {...common}
          maxLength={field.maxLength}
          prefix={field.prefix}
          suffix={field.suffix}
        />
      )
  }
}

function FormFields({ fields }: { fields: FormFieldDef[] }) {
  return (
    <Row gutter={[16, 0]}>
      {fields.map((field) => (
        <Col key={field.name} xs={24} md={field.span ?? 12}>
          <Form.Item
            name={field.name}
            label={field.label}
            required={field.required}
            rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
            extra={field.type === 'checkbox' ? undefined : field.help}
            valuePropName={
              field.type === 'switch' || field.type === 'checkbox' ? 'checked' : undefined
            }
          >
            <FieldControl field={field} />
          </Form.Item>
        </Col>
      ))}
    </Row>
  )
}

export interface T05FormProps<TValues extends object> {
  mode: 'create' | 'edit'
  variant?: 'page' | 'drawer' | 'modal'
  title: ReactNode
  description?: ReactNode

  sections: FormSectionDef[]
  /** Reduced field set for contextual quick-create. §16 */
  quickMode?: boolean

  /** Schema whose OUTPUT is TValues. Accepts .default()/.transform() schemas. */
  schema?: ZodTypeAny
  initialValues?: Partial<TValues>
  onSubmit: (values: TValues) => Promise<void> | void
  onCancel: () => void

  /** Where creating repeatedly is common (masters, products). §16 */
  allowSaveAndNew?: boolean

  open?: boolean
  submitting?: boolean
  form?: FormInstance
  extraActions?: ActionDef[]
}

export function T05Form<TValues extends object>(props: T05FormProps<TValues>) {
  const {
    mode,
    variant = 'page',
    title,
    description,
    sections,
    quickMode,
    schema,
    initialValues,
    onSubmit,
    onCancel,
    allowSaveAndNew,
    open = true,
    submitting,
  } = props

  const [form] = Form.useForm(props.form)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  const visibleSections = useMemo(
    () => (quickMode ? sections.filter((s) => !s.advanced) : sections),
    [sections, quickMode],
  )

  const showSectionNav = variant === 'page' && visibleSections.length >= 4

  const handleFinish = async (saveAndNew = false) => {
    const values = form.getFieldsValue(true)

    if (schema) {
      const result = zodValidate(schema, values)
      if (!result.ok) {
        // Scroll to first error and focus it. §16
        form.setFields(result.errors)
        form.scrollToField(result.errors[0]!.name, { behavior: 'smooth', block: 'center' })
        return
      }
    }

    try {
      setSaving(true)
      await onSubmit(values as TValues)
      setDirty(false)
      if (saveAndNew) form.resetFields()
    } finally {
      setSaving(false)
    }
  }

  /** Unsaved-changes guard on cancel. Always. §16 */
  const handleCancel = () => {
    if (!dirty) return onCancel()
    Modal.confirm({
      title: 'Discard unsaved changes?',
      content: 'Your changes to this form will be lost.',
      okText: 'Discard',
      okButtonProps: { danger: true },
      cancelText: 'Keep editing',
      onOk: onCancel,
    })
  }

  const body = (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      requiredMark
      scrollToFirstError
      onValuesChange={() => setDirty(true)}
      onFinish={() => handleFinish(false)}
    >
      {visibleSections.map((section) => (
        <SectionCard
          key={section.key}
          id={`section-${section.key}`}
          title={section.title}
          description={section.description}
        >
          <FormFields fields={section.fields} />
        </SectionCard>
      ))}
    </Form>
  )

  const footerButtons = (
    <Space>
      <Button onClick={handleCancel}>Cancel</Button>
      {allowSaveAndNew && mode === 'create' ? (
        <Button onClick={() => handleFinish(true)} loading={saving || submitting}>
          Save & New
        </Button>
      ) : null}
      <Button type="primary" onClick={() => handleFinish(false)} loading={saving || submitting}>
        {mode === 'create' ? 'Save' : 'Save changes'}
      </Button>
    </Space>
  )

  /* ------------------------------------------------------------- drawer */
  if (variant === 'drawer') {
    return (
      <Drawer
        open={open}
        title={title}
        width={layout.drawerMd}
        onClose={handleCancel}
        destroyOnClose
        footer={<Flex justify="flex-end">{footerButtons}</Flex>}
      >
        {body}
      </Drawer>
    )
  }

  /* -------------------------------------------------------------- modal */
  if (variant === 'modal') {
    return (
      <Modal
        open={open}
        title={title}
        width={layout.modalMaxWidth}
        onCancel={handleCancel}
        destroyOnClose
        footer={<Flex justify="flex-end">{footerButtons}</Flex>}
      >
        {body}
      </Modal>
    )
  }

  /* --------------------------------------------------------------- page */
  return (
    <div style={{ paddingBottom: 72 }}>
      <PageHeader title={title} description={description} />

      <Row gutter={24}>
        {showSectionNav ? (
          <Col xs={0} lg={5}>
            <div style={{ position: 'sticky', top: 80 }}>
              <Anchor
                affix={false}
                items={visibleSections.map((s) => ({
                  key: s.key,
                  href: `#section-${s.key}`,
                  title: s.title,
                }))}
              />
            </div>
          </Col>
        ) : null}
        <Col xs={24} lg={showSectionNav ? 19 : 24}>
          {body}
        </Col>
      </Row>

      {/* Sticky footer. §16 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'var(--erp-sider-current-width, 240px)',
          right: 0,
          padding: '12px 24px',
          background: palette.neutral[0],
          borderTop: `1px solid ${palette.neutral[200]}`,
          boxShadow: '0 -2px 6px rgba(15,23,42,.05)',
          zIndex: 10,
        }}
      >
        <Flex justify="space-between" align="center">
          <span style={{ fontSize: 12, color: palette.neutral[500] }}>
            <span style={{ color: palette.error[500] }}>*</span> Required fields
            {dirty ? (
              <span style={{ marginLeft: 12, color: palette.warning[700], fontWeight: 500 }}>
                Unsaved changes
              </span>
            ) : null}
          </span>
          {footerButtons}
        </Flex>
      </div>
    </div>
  )
}
