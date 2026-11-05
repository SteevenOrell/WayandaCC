import { validateSubmission } from './booking';

// Fixed "now": Monday 2030-01-07 09:00 local time.
const NOW = new Date(2030, 0, 7, 9, 0);
const base = { name: 'Jane Doe', email: 'jane@example.com', date: '2030-01-08T10:00' };

describe('validateSubmission', () => {
  it('accepts a valid nursing-home booking and only returns whitelisted params', () => {
    const r = validateSubmission('nursing-home', { ...base, numberOfResident: '5', clientType: 'Hacked', extra: 'x' }, NOW);
    expect(r.ok).toBe(true);
    expect(r.params).toEqual({ clientType: 'Nursing Home', name: 'Jane Doe', email: 'jane@example.com', date: base.date, numberOfResident: '5' });
  });

  it('accepts a valid barber sign-up', () => {
    const r = validateSubmission('barber', { ...base, ariaOfWork: 'Toronto' }, NOW);
    expect(r.ok).toBe(true);
    expect(r.params.clientType).toBe('Barber');
  });

  it('rejects bad email, short notice, far future and out-of-hours times', () => {
    expect(validateSubmission('barber', { ...base, email: 'nope', ariaOfWork: 'x1' }, NOW).ok).toBe(false);
    expect(validateSubmission('barber', { ...base, date: '2030-01-07T10:00', ariaOfWork: 'TO' }, NOW).ok).toBe(false);
    expect(validateSubmission('barber', { ...base, date: '2030-06-01T10:00', ariaOfWork: 'TO' }, NOW).ok).toBe(false);
    expect(validateSubmission('barber', { ...base, date: '2030-01-08T06:30', ariaOfWork: 'TO' }, NOW).ok).toBe(false);
    expect(validateSubmission('barber', { ...base, date: '2030-01-08T20:30', ariaOfWork: 'TO' }, NOW).ok).toBe(false);
    expect(validateSubmission('barber', { ...base, date: '2030-01-08T20:00', ariaOfWork: 'TO' }, NOW).ok).toBe(true);
  });

  it('enforces resident range and trims / caps long input', () => {
    expect(validateSubmission('nursing-home', { ...base, numberOfResident: '0' }, NOW).ok).toBe(false);
    expect(validateSubmission('nursing-home', { ...base, numberOfResident: '31' }, NOW).ok).toBe(false);
    const r = validateSubmission('nursing-home', { ...base, name: `  ${'a'.repeat(500)}  `, numberOfResident: '2' }, NOW);
    expect(r.params.name).toHaveLength(80);
  });

  it('flags honeypot submissions as bots', () => {
    expect(validateSubmission('barber', { ...base, company: 'spam inc', ariaOfWork: 'TO' }, NOW)).toEqual({ ok: false, bot: true });
  });
});
