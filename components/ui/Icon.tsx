import type { CSSProperties } from "react";
import {
  Search,
  BarChart3,
  Wrench,
  ClipboardList,
  GraduationCap,
  MapPin,
  HelpCircle,
  Compass,
  Briefcase,
  Bot,
  Calendar,
  Send,
  User,
  Hand,
  X,
  ZoomIn,
  Images,
  Palette,
  FileText,
  Rocket,
  ScrollText,
  Award,
  Globe,
  Phone,
  Mail,
  CheckCircle2,
  PenLine,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   ICON MAP — single source of truth for every icon on the site.
   Content (content.json) references icons by semantic key, not
   emoji, so every icon renders as a real vector glyph instead of
   an emoji — deliberate and consistent, not "AI stock" clip art.
   ============================================================ */
export const ICONS: Record<string, LucideIcon> = {
  search: Search,
  "bar-chart": BarChart3,
  wrench: Wrench,
  "clipboard-list": ClipboardList,
  "graduation-cap": GraduationCap,
  "map-pin": MapPin,
  "help-circle": HelpCircle,
  compass: Compass,
  briefcase: Briefcase,
  bot: Bot,
  calendar: Calendar,
  send: Send,
  user: User,
  hand: Hand,
  x: X,
  "zoom-in": ZoomIn,
  images: Images,
  palette: Palette,
  "file-text": FileText,
  rocket: Rocket,
  "scroll-text": ScrollText,
  award: Award,
  globe: Globe,
  phone: Phone,
  mail: Mail,
  "check-circle": CheckCircle2,
  "pen-line": PenLine,
  flask: FlaskConical,
};

export default function Icon({ name, className, style }: { name: string; className?: string; style?: CSSProperties }) {
  const Cmp = ICONS[name] ?? HelpCircle;
  return <Cmp className={className} style={style} strokeWidth={1.75} />;
}
