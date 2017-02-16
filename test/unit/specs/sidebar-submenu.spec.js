import { createTest, destroyVM } from '../util';
import SidebarSubmenu from 'packages/sidebar-submenu';

describe('SidebarSubmenu', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SidebarSubmenu, true);
    expect(vm.$el).to.exist;
  });
});

