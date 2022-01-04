export const verifyEmailContent = (token: string, email: string) => {
  const data = {
    from: 'cat@cat.com',
    to: email,
    subject: 'Account Activation Link',
    html: `
      <h2>Please click on the link to verify your account.</h2>
      <a href='${process.env.CLIENT_URL}/authentication/verify/${token}'>${process.env.CLIENT_URL}/authentication/verify/${token}</a>
    `,
  }

  return data
}

export const dataValidation = (name: string, email: string, password: string) => {
  if (email === '' || password === '' || name === '') {
    throw new Error('Provide name, email and password')
  }

  const emailValid = email.includes('@')

  if (!emailValid) {
    throw new Error('Provide a valid email address.')
  }

  if (password.length < 8) {
    throw new Error('Password must have at least 8 characters')
  }
}

