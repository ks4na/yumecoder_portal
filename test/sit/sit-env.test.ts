describe('confirm sit env', () => {
  test('NODE_ENV should be "sit"', () => {
    expect(process.env.NODE_ENV).toBe('sit')
  })
})

export {}
