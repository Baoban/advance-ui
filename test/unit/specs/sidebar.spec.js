import { createTest, destroyVM } from '../util';
import Sidebar from 'packages/sidebar';

describe('Sidebar', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Sidebar, true);
    expect(vm.$el).to.exist;
  });
});

