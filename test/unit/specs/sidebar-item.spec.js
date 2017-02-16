import { createTest, destroyVM } from '../util';
import SidebarItem from 'packages/sidebar-item';

describe('SidebarItem', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SidebarItem, true);
    expect(vm.$el).to.exist;
  });
});

