import FormOTP from '@/components/forgot-password/FormOTP'
import FormPassword from '@/components/forgot-password/FormPassword'
import React from 'react'

interface Props {
  params:{updated:any}
}

const page = ({ params: { updated } }:Props) => {
  const userId=updated[0]
  const action=updated[1]
  return (
    <section>
      { action==="otp"?<FormOTP idUser={userId} />:<FormPassword idUser={userId} />}
    </section>
  )
}

export default page
