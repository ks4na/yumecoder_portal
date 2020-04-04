describe('confirm unittest env', () => {
  test('NODE_ENV should be "unittest"', () => {
    expect(process.env.NODE_ENV).toBe('unittest')
  })
})

export {}
