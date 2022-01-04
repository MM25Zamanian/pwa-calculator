export default interface Route {
  path: string;
  name: string;
  label?: string;
  icon?: string;
  show_on_nav?: boolean;
  component: string;
  action: () => Promise<void>;
}
