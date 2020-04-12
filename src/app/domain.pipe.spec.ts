import { DomainPipe } from './domain.pipe';

describe('DomainPipe', () => {
  it('create an instance', () => {
    const pipe = new DomainPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns hostname when url is passed', () => {
    const pipe = new DomainPipe();
    expect(pipe.transform('https://www.google.com')).toEqual('google.com');
    expect(pipe.transform('https://github.com')).toEqual('github.com');
    expect(pipe.transform('')).toEqual('');
  });
});
