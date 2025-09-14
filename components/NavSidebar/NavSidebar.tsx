import {
  GalleryVerticalEnd,
  ChevronsUpDown,
  BookOpen,
  CookingPot,
  FlaskConical,
  FolderCog,
  Hop,
  NotebookTabs,
  PillBottle,
  ToolCase,
  Wheat,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import { NavMain } from "./NavMain";
import { NavAdmin } from "./NavAdmin";

const data = {
  ingredients: [
    {
      title: "Recipes",
      icon: BookOpen,
      url: "#",
      items: [
        {
          title: "Library",
          url: "#",
        },
        {
          title: "Public",
          url: "#",
        },
      ],
    },
    {
      title: "Ingredients",
      url: "/ingredients",
      icon: CookingPot,
      items: [
        {
          title: "Grains",
          icon: Wheat,
          url: "/ingredients/grains",
        },
        {
          title: "Hops",
          icon: Hop,
          url: "/ingredients/hops",
          //          isActive: true,
        },
        {
          title: "Yeasts",
          icon: FlaskConical,
          url: "/ingredients/yeasts",
        },
        {
          title: "Other",
          icon: PillBottle,
          url: "/ingredients/other",
        },
      ],
    },
    {
      title: "Profiles",
      icon: FolderCog,
      url: "/profiles",
      items: [
        {
          title: "Equipment",
          url: "/profiles/equipment",
        },
        {
          title: "Mash",
          url: "/profiles/mash",
        },
        {
          title: "Water",
          url: "/profiles/water",
        },
        {
          title: "Fermentation",
          url: "/profiles/fermentation",
        },
      ],
    },
    {
      title: "Styles",
      icon: NotebookTabs,
      url: "/styles",
    },
    {
      title: "Tools",
      icon: ToolCase,
      url: "/tools",
      items: [
        { title: "ABV Calculator", url: "#" },
        { title: "IBU Calculator", url: "#" },
        { title: "Color Calculator", url: "#" },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">LNK</span>
                <span className="truncate text-xs">Brew</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.ingredients} />
        <NavAdmin />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export default NavSidebar;
