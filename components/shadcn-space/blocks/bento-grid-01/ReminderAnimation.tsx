"use client";

import {
  BarChart3,
  Check,
  CirclePlay,
  Diamond,
  FormInput,
  LayoutGrid,
  type LucideIcon,
  Route,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
  icon: LucideIcon;
};

const DATA: Item[] = [
  {
    id: "1",
    title: "Breadcrumb component",
    icon: Route,
  },
  {
    id: "2",
    title: "Animated component",
    icon: CirclePlay,
  },
  {
    id: "3",
    title: "UI components",
    icon: Diamond,
  },
  {
    id: "4",
    title: "Form components",
    icon: FormInput,
  },
  {
    id: "5",
    title: "Chart components",
    icon: BarChart3,
  },
  {
    id: "6",
    title: "Layout components",
    icon: LayoutGrid,
  },
  {
    id: "7",
    title: "Area Chart",
    icon: BarChart3,
  },
];

export type ReminderItem = Item;

type Props = {
  items?: Item[];
};

export default function ReminderAnimation({ items = DATA }: Props) {
  const source = items.length > 0 ? items : DATA;
  const sourceKey = source.map((item) => item.id).join("|");
  const [visible, setVisible] = useState<Item[]>(() => source.slice(0, 3));
  const [pointer, setPointer] = useState(() => Math.min(2, source.length - 1));

  useEffect(() => {
    setVisible(source.slice(0, Math.min(3, source.length)));
    setPointer(Math.min(2, source.length - 1));
    // Reset only when item ids change (avoid reset on new array refs)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sourceKey tracks identity
  }, [sourceKey]);

  useEffect(() => {
    if (source.length < 2) return;
    const interval = setInterval(() => {
      setVisible((prev) => {
        const nextIndex = (pointer + 1) % source.length;
        setPointer(nextIndex);
        return [...prev.slice(1), source[nextIndex]];
      });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pointer drives rotation; sourceKey for list swaps
  }, [pointer, sourceKey]);

  return (
    <div className="relative flex h-52 w-full flex-col items-center overflow-hidden rounded-2xl">
      <AnimatePresence initial={false}>
        {visible.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ y: 215, opacity: 0, scale: 0.9 }}
            animate={{
              y: i * 70,
              scale: i === 1 ? 1 : 0.9,
              opacity: i === 1 ? 1 : 0.5,
            }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute flex w-full items-center justify-between rounded-xl border border-border bg-background px-5 py-4 text-card-foreground"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              <Check size={20} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
