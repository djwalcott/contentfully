import { defaultTheme } from '../../styles/theme';
import { resolveColor } from '../color';

describe('color resolver', () => {
  test('returns correct text color', async () => {
    const color = resolveColor(defaultTheme, 'text');
    expect(color).toEqual('#6B7280');
  });

  test('returns correct background color', async () => {
    const color = resolveColor(defaultTheme, 'background');
    expect(color).toEqual('#fafaf9');
  });
});
