import { createTest, destroyVM } from '../util';
import SidebarGroup from 'packages/sidebar-group';

describe('SidebarGroup', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SidebarGroup, true);
    expect(vm.$el).to.exist;
  });
});

