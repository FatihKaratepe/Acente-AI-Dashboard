import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo } from './Logo';

export const SidebarComponent = () => {
  const data = {
    navMain: [
      {
        title: 'Policies',
        items: [
          { title: 'All', url: '#', isActive: true },
          { title: 'Approved', url: '#', isActive: false },
          { title: 'Payment Required', url: '#', isActive: false },
          { title: 'Pending', url: '#', isActive: false },
        ],
      },
      {
        title: 'Customers',
        items: [
          { title: 'All', url: '#', isActive: true },
          { title: 'Active', url: '#', isActive: false },
          { title: 'Inactive', url: '#', isActive: false },
        ],
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
