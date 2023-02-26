jest.mock('rxjs', () => {
  const rxjs = jest.requireActual('rxjs');

  return {
    ...rxjs,
    lastValueFrom: async () => Promise.resolve(),
  };
});
