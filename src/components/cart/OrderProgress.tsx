interface OrderProgressProps {
  currentStep: 1 | 2 | 3
}

export const OrderProgress = ({ currentStep }: OrderProgressProps) => {
  const steps = [
    { id: 1, label: '01 장바구니' },
    { id: 2, label: '02 주문서 작성/결제' },
    { id: 3, label: '03 주문완료' }
  ]

  return (
    <div className='mb-6 text-right text-sm text-gray-500'>
      {steps.map((step, index) => (
        <span key={step.id}>
          <span
            className={
              step.id === currentStep ? 'text-base font-bold text-black' : ''
            }
          >
            {step.label}
          </span>
          {index < steps.length - 1 && ' > '}
        </span>
      ))}
    </div>
  )
}
