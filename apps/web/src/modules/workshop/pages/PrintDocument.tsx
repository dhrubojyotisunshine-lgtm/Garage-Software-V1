import { Flex } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  NotFoundState,
  PrintDocumentFooter,
  PrintDocumentHeader,
  T11PrintPreview,
} from '@garage/ui'
import {
  amountPaid,
  balanceDue,
  formatDate,
  formatDateTime,
  formatMoney,
  formatQuantity,
  formatRegistration,
  invoiceTotals,
  lineTotals,
} from '@garage/shared'
import { useWorkshopStore } from '@/store/workshopStore'

/**
 * Print documents (T11) — Tax Invoice and Gate Pass.
 *
 * Company details would come from Settings in the full build; they are the one
 * hard-coded block here and are marked for replacement.
 */

const COMPANY = {
  name: 'Shree Auto Care Pvt. Ltd.',
  address: 'Survey No. 42, Hadapsar Industrial Estate\nPune, Maharashtra 411013\nPhone: 020 2687 4400',
  gstin: '27AABCS1429B1ZX',
}

export default function PrintDocument() {
  const params = useParams()
  const navigate = useNavigate()
  const store = useWorkshopStore()

  const jobCard = store.jobCardById(params.id)
  const doc = params.document

  if (!jobCard) return <NotFoundState what="job card" />

  const customer = store.customerById(jobCard.customerId)
  const vehicle = store.vehicleById(jobCard.vehicleId)

  return doc === 'gate-pass' ? (
    <GatePass jobCard={jobCard} customer={customer} vehicle={vehicle} onClose={() => navigate(-1)} />
  ) : (
    <Invoice jobCard={jobCard} customer={customer} vehicle={vehicle} onClose={() => navigate(-1)} />
  )
}

type Props = {
  jobCard: NonNullable<ReturnType<ReturnType<typeof useWorkshopStore.getState>['jobCardById']>>
  customer?: ReturnType<ReturnType<typeof useWorkshopStore.getState>['customerById']>
  vehicle?: ReturnType<ReturnType<typeof useWorkshopStore.getState>['vehicleById']>
  onClose: () => void
}

function PartyBlock({ customer, vehicle, jobCard }: Omit<Props, 'onClose'>) {
  return (
    <div className="erp-print-block" style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
      <div style={{ flex: 1, fontSize: 10 }}>
        <strong>Bill To</strong>
        <div>{customer?.name}</div>
        <div>+91 {customer?.mobile}</div>
        {customer?.addressLine ? <div>{customer.addressLine}</div> : null}
        <div>
          {customer?.city}, {customer?.state} {customer?.pincode ?? ''}
        </div>
        {customer?.gstin ? <div>GSTIN: {customer.gstin}</div> : null}
      </div>
      <div style={{ flex: 1, fontSize: 10 }}>
        <strong>Vehicle</strong>
        <div>
          {vehicle?.manufacturer} {vehicle?.model} {vehicle?.variant ?? ''}
        </div>
        <div>Reg: {formatRegistration(vehicle?.registration ?? '')}</div>
        {vehicle?.vin ? <div>VIN: {vehicle.vin}</div> : null}
        <div>Odometer: {jobCard.odometer.toLocaleString('en-IN')} km</div>
        <div>Job Card: {jobCard.jobCardNo}</div>
      </div>
    </div>
  )
}

function Invoice({ jobCard, customer, vehicle, onClose }: Props) {
  const totals = invoiceTotals(jobCard)
  const paid = amountPaid(jobCard)
  const balance = balanceDue(jobCard)

  return (
    <T11PrintPreview
      documentTitle={`Tax Invoice ${jobCard.invoiceNo ?? '(not generated)'}`}
      copyType="Original"
      onCopyTypeChange={() => undefined}
      onDownload={() => window.print()}
      onClose={onClose}
    >
      <PrintDocumentHeader
        companyName={COMPANY.name}
        companyAddress={COMPANY.address}
        gstin={COMPANY.gstin}
        documentTitle="Tax Invoice"
        documentNumber={jobCard.invoiceNo ?? '—'}
        documentDate={formatDate(jobCard.invoicedAt)}
        copyType="Original"
      />

      <PartyBlock jobCard={jobCard} customer={customer} vehicle={vehicle} />

      <table>
        <thead>
          <tr>
            <th style={{ width: 22 }}>#</th>
            <th>Description</th>
            <th style={{ width: 52 }}>Type</th>
            <th style={{ width: 60 }} className="num">Qty</th>
            <th style={{ width: 66 }} className="num">Rate</th>
            <th style={{ width: 66 }} className="num">Taxable</th>
            <th style={{ width: 34 }} className="num">GST</th>
            <th style={{ width: 62 }} className="num">Tax</th>
            <th style={{ width: 72 }} className="num">Total</th>
          </tr>
        </thead>
        <tbody>
          {jobCard.items.map((item, i) => {
            const l = lineTotals(item)
            return (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>
                  {item.name}
                  {item.code ? <span style={{ color: '#64748B' }}> · {item.code}</span> : null}
                </td>
                <td>{item.type}</td>
                <td className="num">{formatQuantity(item.quantity, item.unit)}</td>
                <td className="num">{formatMoney(item.rate, { symbol: false })}</td>
                <td className="num">{formatMoney(l.taxable, { symbol: false })}</td>
                <td className="num">{item.taxRate}%</td>
                <td className="num">{formatMoney(l.tax, { symbol: false })}</td>
                <td className="num">{formatMoney(l.total, { symbol: false })}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Flex justify="flex-end" style={{ marginTop: 12 }} className="erp-print-block">
        <table style={{ width: 280 }}>
          <tbody>
            <tr>
              <td>Taxable Value</td>
              <td className="num">{formatMoney(totals.taxable)}</td>
            </tr>
            <tr>
              <td>CGST</td>
              <td className="num">{formatMoney(totals.cgst)}</td>
            </tr>
            <tr>
              <td>SGST</td>
              <td className="num">{formatMoney(totals.sgst)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Invoice Total</td>
              <td className="num" style={{ fontWeight: 700 }}>
                {formatMoney(totals.total)}
              </td>
            </tr>
            <tr>
              <td>Received</td>
              <td className="num">{formatMoney(paid)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Balance Due</td>
              <td className="num" style={{ fontWeight: 700 }}>
                {formatMoney(balance)}
              </td>
            </tr>
          </tbody>
        </table>
      </Flex>

      {jobCard.payments.length ? (
        <div className="erp-print-block" style={{ marginTop: 12, fontSize: 9 }}>
          <strong>Payments</strong>
          {jobCard.payments.map((p) => (
            <div key={p.id}>
              {p.receiptNo} · {formatDateTime(p.receivedAt)} · {p.mode}
              {p.reference ? ` · ${p.reference}` : ''} · {formatMoney(p.amount)}
            </div>
          ))}
        </div>
      ) : null}

      <PrintDocumentFooter
        terms={
          'Goods once sold will not be taken back.\nWarranty as per manufacturer terms.\nSubject to Pune jurisdiction.'
        }
      />
    </T11PrintPreview>
  )
}

function GatePass({ jobCard, customer, vehicle, onClose }: Props) {
  return (
    <T11PrintPreview
      documentTitle={`Gate Pass ${jobCard.gatePassNo ?? '(not generated)'}`}
      onDownload={() => window.print()}
      onClose={onClose}
    >
      <PrintDocumentHeader
        companyName={COMPANY.name}
        companyAddress={COMPANY.address}
        gstin={COMPANY.gstin}
        documentTitle="Gate Pass"
        documentNumber={jobCard.gatePassNo ?? '—'}
        documentDate={formatDate(jobCard.deliveredAt)}
      />

      <PartyBlock jobCard={jobCard} customer={customer} vehicle={vehicle} />

      <table>
        <tbody>
          <tr>
            <th style={{ width: 160 }}>Job Card</th>
            <td>{jobCard.jobCardNo}</td>
          </tr>
          <tr>
            <th>Invoice</th>
            <td>{jobCard.invoiceNo ?? '—'}</td>
          </tr>
          <tr>
            <th>Service Type</th>
            <td>{jobCard.serviceType}</td>
          </tr>
          <tr>
            <th>Invoice Amount</th>
            <td>{formatMoney(invoiceTotals(jobCard).total)}</td>
          </tr>
          <tr>
            <th>Balance Due</th>
            <td>{formatMoney(balanceDue(jobCard))}</td>
          </tr>
          <tr>
            <th>Delivered At</th>
            <td>{formatDateTime(jobCard.deliveredAt)}</td>
          </tr>
        </tbody>
      </table>

      <div className="erp-print-block" style={{ marginTop: 16, fontSize: 10 }}>
        <strong>Delivery Checklist</strong>
        <table style={{ marginTop: 4 }}>
          <tbody>
            <tr>
              <td>Vehicle cleaned and ready</td>
              <td style={{ width: 60 }}>{jobCard.deliveryChecklist?.vehicleCleaned ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Accessories verified and returned</td>
              <td>{jobCard.deliveryChecklist?.accessoriesReturned ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Invoice and documents handed over</td>
              <td>{jobCard.deliveryChecklist?.documentsHanded ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Work explained to customer</td>
              <td>{jobCard.deliveryChecklist?.customerSatisfied ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="erp-print-block"
        style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', fontSize: 10 }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: 36 }} />
          <div style={{ borderTop: '1px solid #0f172a', paddingTop: 4, minWidth: 160 }}>
            Customer Signature
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ height: 36 }} />
          <div style={{ borderTop: '1px solid #0f172a', paddingTop: 4, minWidth: 160 }}>
            Security / Gate
          </div>
        </div>
      </div>

      <PrintDocumentFooter
        terms={'This gate pass must be presented at the gate.\nVehicle released against a cleared invoice.'}
        signatureLabel="Authorised Signatory"
      />
    </T11PrintPreview>
  )
}
