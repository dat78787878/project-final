import { render } from '@testing-library/react';

import Inputsearch from './inputsearch';

describe('Inputsearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inputsearch data={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
