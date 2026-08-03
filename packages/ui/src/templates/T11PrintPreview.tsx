import type { ReactNode } from 'react'
import { Button, Flex, Select, Space } from 'antd'
import {
  CloseOutlined,
  DownloadOutlined,
  MailOutlined,
  PrinterOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import type { PrintCopyType, PrintTemplateOption } from '../types'
import { palette } from '../theme/tokens'

/**
 * T11 — PRINT / DOCUMENT PREVIEW
 *
 * Preview and output a generated business document.
 *
 * Rules:
 *  - Opens as a full-screen overlay from the source record — never a sidebar
 *    destination. §22
 *  - What is shown is what prints (true A4 rendering).
 *  - Company profile data comes from Settings, never hard-coded.
 *
 * Print CSS lives in theme/print.css and is shared by all 17+ documents.
 *
 * Ref: 03_PAGE_TEMPLATES.md §22, 01_ADMIN_THEME.md §18
 */

export const PRINT_COPY_TYPES: PrintCopyType[] = ['Original', 'Duplicate', 'Triplicate']

export interface T11PrintPreviewProps {
  /** e.g. "Tax Invoice #INV-2026-004821" */
  documentTitle: ReactNode

  templates?: PrintTemplateOption[]
  activeTemplate?: string
  onTemplateChange?: (key: string) => void

  copyType?: PrintCopyType
  onCopyTypeChange?: (t: PrintCopyType) => void

  onPrint?: () => void
  onDownload?: () => void
  onEmail?: () => void
  onWhatsApp?: () => void
  onClose: () => void

  /** Page count for multi-page documents. */
  pageCount?: number
  currentPage?: number

  /** The rendered A4 document body. */
  children: ReactNode
}

export function T11PrintPreview({
  documentTitle,
  templates,
  activeTemplate,
  onTemplateChange,
  copyType = 'Original',
  onCopyTypeChange,
  onPrint,
  onDownload,
  onEmail,
  onWhatsApp,
  onClose,
  pageCount = 1,
  currentPage = 1,
  children,
}: T11PrintPreviewProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: palette.neutral[200],
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* --------------------------------------------- PREVIEW TOOLBAR */}
      <Flex
        className="erp-print-toolbar erp-no-print"
        justify="space-between"
        align="center"
        gap={16}
        wrap
        style={{
          padding: '10px 16px',
          background: palette.neutral[0],
          borderBottom: `1px solid ${palette.neutral[200]}`,
          flex: '0 0 auto',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600 }}>{documentTitle}</span>

        <Space size={8} wrap>
          {templates?.length ? (
            <Select
              value={activeTemplate}
              onChange={onTemplateChange}
              options={templates.map((t) => ({ label: t.label, value: t.key }))}
              style={{ width: 180 }}
            />
          ) : null}

          {onCopyTypeChange ? (
            <Select
              value={copyType}
              onChange={onCopyTypeChange}
              options={PRINT_COPY_TYPES.map((t) => ({ label: t, value: t }))}
              style={{ width: 140 }}
            />
          ) : null}

          {onEmail ? <Button icon={<MailOutlined />} onClick={onEmail}>Email</Button> : null}
          {onWhatsApp ? (
            <Button icon={<WhatsAppOutlined />} onClick={onWhatsApp}>
              WhatsApp
            </Button>
          ) : null}
          {onDownload ? (
            <Button icon={<DownloadOutlined />} onClick={onDownload}>
              Download PDF
            </Button>
          ) : null}
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={onPrint ?? (() => window.print())}
          >
            Print
          </Button>
          <Button icon={<CloseOutlined />} onClick={onClose} aria-label="Close preview" />
        </Space>
      </Flex>

      {/* -------------------------------------------- DOCUMENT CANVAS */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div className="erp-print-canvas">{children}</div>

        {pageCount > 1 ? (
          <div
            className="erp-no-print"
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: 12,
              color: palette.neutral[600],
            }}
          >
            Page {currentPage} of {pageCount}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Standard document header. Company details come from Settings — a document
 * template must never hard-code them. §22
 */
export function PrintDocumentHeader({
  companyName,
  companyAddress,
  gstin,
  logoUrl,
  documentTitle,
  documentNumber,
  documentDate,
  copyType,
}: {
  companyName: string
  companyAddress: string
  gstin?: string
  logoUrl?: string
  documentTitle: string
  documentNumber: string
  documentDate: string
  copyType?: PrintCopyType
}) {
  return (
    <div className="erp-print-block" style={{ marginBottom: 16 }}>
      <Flex justify="space-between" align="flex-start">
        <Flex gap={12} align="flex-start">
          {logoUrl ? <img src={logoUrl} alt="" style={{ height: 44 }} /> : null}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{companyName}</div>
            <div style={{ fontSize: 10, whiteSpace: 'pre-line' }}>{companyAddress}</div>
            {gstin ? <div style={{ fontSize: 10 }}>GSTIN: {gstin}</div> : null}
          </div>
        </Flex>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>
            {documentTitle}
          </div>
          {copyType ? <div style={{ fontSize: 9 }}>({copyType})</div> : null}
          <div style={{ fontSize: 10, marginTop: 4 }}>
            <strong>No:</strong> {documentNumber}
          </div>
          <div style={{ fontSize: 10 }}>
            <strong>Date:</strong> {documentDate}
          </div>
        </div>
      </Flex>
      <div style={{ borderBottom: '2px solid #0f172a', marginTop: 8 }} />
    </div>
  )
}

export function PrintDocumentFooter({
  terms,
  signatureLabel = 'Authorised Signatory',
}: {
  terms?: string
  signatureLabel?: string
}) {
  return (
    <div className="erp-print-block" style={{ marginTop: 24 }}>
      <Flex justify="space-between" align="flex-end" gap={24}>
        <div style={{ fontSize: 9, maxWidth: '60%', whiteSpace: 'pre-line' }}>
          {terms ? (
            <>
              <strong>Terms &amp; Conditions</strong>
              <div>{terms}</div>
            </>
          ) : null}
        </div>
        <div style={{ textAlign: 'center', fontSize: 10 }}>
          <div style={{ height: 40 }} />
          <div style={{ borderTop: '1px solid #0f172a', paddingTop: 4, minWidth: 160 }}>
            {signatureLabel}
          </div>
        </div>
      </Flex>
    </div>
  )
}
