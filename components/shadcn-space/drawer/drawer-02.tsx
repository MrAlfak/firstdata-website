"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EmptyState from "@/components/shadcn-space/blocks/empty-state-06/empty-state";
import PixelIcon from "@/components/icons/PixelIcon";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 555;
const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.08;
const CART_STORAGE_KEY = "fd_cart_v1";

export type CartItem = {
  id: string;
  name: string;
  meta: string[];
  price: number;
  qty: number;
  image: string;
};

/** Sample items for the drawer-02 demo / showcase only. */
export const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: "linen-jacket",
    name: "Essential Linen Jacket",
    meta: ["Size: M", "Color: Beige"],
    price: 89.0,
    qty: 1,
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-02-2.webp",
  },
  {
    id: "apple-watch",
    name: "Apple Watch Series 9 [GPS 45mm]",
    meta: ["Color: Starlight"],
    price: 429.0,
    qty: 1,
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
  },
];

const suggestions = [
  {
    id: "space-pro-headphones",
    name: "Space Pro Headphones",
    price: 149,
    rating: 4.6,
    reviews: "1.2k",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-4.webp",
  },
  {
    id: "glow-serum",
    name: "Glow Serum",
    price: 49,
    rating: 4.8,
    reviews: "3.4k",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-3.webp",
  },
  {
    id: "space-mini-tote",
    name: "Space Mini Tote",
    price: 65,
    rating: 4.3,
    reviews: "287",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-02-img-1.webp",
  },
];

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    Array.isArray(item.meta) &&
    typeof item.price === "number" &&
    typeof item.qty === "number" &&
    typeof item.image === "string"
  );
}

function readStoredCart(): CartItem[] | null {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type ShoppingCartDrawerLabels = {
  viewCart?: string;
  items?: (count: number) => string;
  spendMore?: (amount: string) => string;
  freeShippingUnlocked?: string;
  emptyProgress?: string;
  youMayAlsoLike?: string;
  subtotal?: (count: number) => string;
  shipping?: string;
  shippingFree?: string;
  tax?: string;
  checkout?: (total: string) => string;
  close?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyCta?: string;
  emptyCtaHref?: string;
};

export type ShoppingCartDrawerProps = {
  /** Icon-only trigger (header). Demo keeps full “View Cart” button when false. */
  iconOnly?: boolean;
  triggerClassName?: string;
  triggerAriaLabel?: string;
  labels?: ShoppingCartDrawerLabels;
  /** Wrap the trigger (e.g. HeaderIconTip). */
  triggerWrapper?: (trigger: ReactNode) => ReactNode;
  /**
   * Starting cart lines. Header omits this (defaults to `[]` — empty until user adds).
   * Demo may pass `SAMPLE_CART_ITEMS`.
   */
  initialItems?: CartItem[];
  /** Persist cart in localStorage (Header). Demo should pass `false`. */
  persist?: boolean;
};

/** Transparent outer shell + inset floating card (matches drawer-02 demo). */
const CART_DRAWER_CONTENT_CLASS = cn(
  "[--drawer-inset:0px] [--drawer-bleed-background:transparent]",
  "m-0! rounded-none! border-0! bg-transparent! p-4 shadow-none!",
  "data-[swipe-axis=x]:[--drawer-content-width:100%]",
  "data-[swipe-axis=x]:sm:[--drawer-content-width:39.125rem]",
  // Card chrome on inner [data-slot=drawer-content] — padding on popup (not
  // margin+w-full) so borders/separators stay inside rounded-2xl.
  "**:data-[slot=drawer-content]:m-0",
  "**:data-[slot=drawer-content]:min-h-0",
  "**:data-[slot=drawer-content]:min-w-0",
  "**:data-[slot=drawer-content]:flex-1",
  "**:data-[slot=drawer-content]:overflow-hidden",
  "**:data-[slot=drawer-content]:rounded-2xl",
  "**:data-[slot=drawer-content]:border",
  "**:data-[slot=drawer-content]:border-border",
  "**:data-[slot=drawer-content]:bg-popover",
  "**:data-[slot=drawer-content]:text-popover-foreground",
  "**:data-[slot=drawer-content]:shadow-2xl",
);

export function ShoppingCartDrawer({
  iconOnly = false,
  triggerClassName,
  triggerAriaLabel,
  labels,
  triggerWrapper,
  initialItems = [],
  persist = true,
}: ShoppingCartDrawerProps = {}) {
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [hydrated, setHydrated] = useState(!persist);
  const hasFiredConfettiRef = useRef(false);
  const progressSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!persist) return;
    queueMicrotask(() => {
      const stored = readStoredCart();
      if (stored) setItems(stored);
      setHydrated(true);
    });
  }, [persist]);

  useEffect(() => {
    if (!persist || !hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items, persist, hydrated]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addSuggestion = (suggestion: (typeof suggestions)[number]) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === suggestion.id);
      if (existing) {
        return prev.map((item) =>
          item.id === suggestion.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          id: suggestion.id,
          name: suggestion.name,
          meta: [],
          price: suggestion.price,
          qty: 1,
          image: suggestion.image,
        },
      ];
    });
  };

  const isEmpty = items.length === 0;
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee =
    isEmpty || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + shippingFee;

  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );
  const shippingProgress = isEmpty
    ? 0
    : Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  useEffect(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0) {
      if (!hasFiredConfettiRef.current) {
        if (progressSectionRef.current) {
          const rect = progressSectionRef.current.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { x, y },
          });
        }
        hasFiredConfettiRef.current = true;
      }
    } else {
      hasFiredConfettiRef.current = false;
    }
  }, [subtotal]);

  const viewCartLabel = labels?.viewCart ?? "View Cart";
  const ariaLabel = triggerAriaLabel ?? viewCartLabel;
  const itemsTitle =
    labels?.items?.(totalCount) ?? `${totalCount} Items`;
  const shippingCopy = isEmpty
    ? (labels?.emptyProgress ?? "Add items to unlock free shipping")
    : remainingForFreeShipping > 0
      ? (labels?.spendMore?.(remainingForFreeShipping.toFixed(2)) ??
        `Spend another $${remainingForFreeShipping.toFixed(2)} and get free shipping!`)
      : (labels?.freeShippingUnlocked ?? "You've unlocked free shipping!");
  const alsoLike = labels?.youMayAlsoLike ?? "You May Also Like";
  const subtotalLabel =
    labels?.subtotal?.(totalCount) ?? `Subtotal (${totalCount} items)`;
  const shippingLabel = labels?.shipping ?? "Shipping";
  const shippingFree = labels?.shippingFree ?? "Free";
  const taxLabel = labels?.tax ?? "Tax";
  const checkoutLabel =
    labels?.checkout?.(`$${total.toFixed(2)}`) ??
    `Checkout $${total.toFixed(2)}`;
  const closeLabel = labels?.close ?? "Close";
  const emptyTitle = labels?.emptyTitle ?? "Cart is empty";
  const emptyDescription =
    labels?.emptyDescription ??
    "No items yet. Add from suggestions below or browse products.";
  const emptyCta = labels?.emptyCta ?? "Browse products";
  const emptyCtaHref = labels?.emptyCtaHref ?? "/product";

  const trigger = iconOnly ? (
    <DrawerTrigger
      render={
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(triggerClassName)}
        />
      }
    >
      {modern ? (
        <ShoppingCartIcon className="size-4" />
      ) : (
        <PixelIcon name="shopping-shipping-cart" size={16} className="text-current" />
      )}
    </DrawerTrigger>
  ) : (
    <DrawerTrigger
      render={
        <Button
          variant="outline"
          className={cn("cursor-pointer", triggerClassName)}
          aria-label={ariaLabel}
        />
      }
    >
      {modern ? (
        <ShoppingCartIcon className="size-4" />
      ) : (
        <PixelIcon name="shopping-shipping-cart" size={16} className="text-current" />
      )}
      {viewCartLabel}
    </DrawerTrigger>
  );

  return (
    <Drawer swipeDirection="right">
      {triggerWrapper ? triggerWrapper(trigger) : trigger}
      <DrawerContent className={CART_DRAWER_CONTENT_CLASS}>
        <DrawerHeader className="flex shrink-0 flex-row items-center justify-between gap-0 border-b border-border p-6">
          <div className="flex min-w-0 items-center gap-3">
            {modern ? (
              <ShoppingBagIcon className="size-5 shrink-0" />
            ) : (
              <PixelIcon name="shopping-shipping-cart" size={20} className="text-current" />
            )}
            <DrawerTitle className="truncate text-xl font-medium">
              {itemsTitle}
            </DrawerTitle>
          </div>
          <DrawerClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0 cursor-pointer"
                aria-label={closeLabel}
              >
                {modern ? (
                  <XIcon className="size-5" />
                ) : (
                  <PixelIcon name="phone-actions-remove-1" size={16} className="text-current" />
                )}
              </Button>
            }
          />
        </DrawerHeader>

        <div
          ref={progressSectionRef}
          className="flex shrink-0 flex-col items-center gap-4 border-b border-border px-10 py-6 text-center"
        >
          <p className="text-base font-medium text-balance">{shippingCopy}</p>
          {/* dir=ltr keeps Progress fill correct in RTL without flipping LTR demo */}
          <Progress
            value={shippingProgress}
            dir="ltr"
            className="w-full max-w-full bg-primary/10 [&>div]:h-2"
          />
        </div>

        <ScrollArea className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="flex w-full min-w-0 max-w-full flex-col gap-8 overflow-x-hidden p-6">
            <div className="flex w-full min-w-0 flex-col gap-6">
              {isEmpty ? (
                <EmptyState
                  compact
                  className="min-w-0 max-w-full px-0 py-2 sm:py-4"
                  icon={<ShoppingCartIcon className="size-6" />}
                  title={emptyTitle}
                  description={emptyDescription}
                  primaryAction={{
                    label: emptyCta,
                    href: emptyCtaHref,
                  }}
                />
              ) : (
                items.map((item, index) => (
                  <div key={item.id} className="flex w-full min-w-0 flex-col gap-6">
                    <div className="flex w-full min-w-0 items-start gap-4">
                      <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 items-start gap-5">
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <p className="truncate text-base">{item.name}</p>
                            {item.meta.map((line) => (
                              <p
                                key={line}
                                className="text-sm text-muted-foreground"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <ButtonGroup dir="ltr">
                              <Button
                                variant="outline"
                                size="icon-sm"
                                className="cursor-pointer shadow-xs"
                                onClick={() => updateQty(item.id, -1)}
                              >
                                <MinusIcon />
                              </Button>
                              <ButtonGroupText className="min-w-9 justify-center px-2 text-sm tabular-nums">
                                {String(item.qty).padStart(2, "0")}
                              </ButtonGroupText>
                              <Button
                                variant="outline"
                                size="icon-sm"
                                className="cursor-pointer shadow-xs"
                                onClick={() => updateQty(item.id, 1)}
                              >
                                <PlusIcon />
                              </Button>
                            </ButtonGroup>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              className="cursor-pointer text-muted-foreground shadow-xs hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2Icon />
                            </Button>
                          </div>
                        </div>
                        <p
                          dir="ltr"
                          className="shrink-0 text-lg font-medium tabular-nums"
                        >
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {index !== items.length - 1 ? (
                      <Separator className="max-w-full" />
                    ) : null}
                  </div>
                ))
              )}
            </div>

            <div className="flex w-full min-w-0 flex-col gap-4">
              <p className="text-base font-medium">{alsoLike}</p>
              <ScrollArea className="w-full max-w-full overflow-hidden whitespace-nowrap">
                <div className="flex w-max gap-4 pb-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="w-52.75 shrink-0 overflow-hidden rounded-2xl border border-border"
                    >
                      <div className="relative h-42.5 w-full border-b border-border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={suggestion.image}
                          alt={suggestion.name}
                          className="size-full object-cover"
                        />
                        <Button
                          size="icon-sm"
                          className="absolute top-3 right-3 size-9 cursor-pointer rounded-full bg-gray-950 text-white hover:bg-gray-950/80"
                          onClick={() => addSuggestion(suggestion)}
                          aria-label={`Add ${suggestion.name}`}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2 p-4">
                        <p className="truncate text-base font-medium">
                          {suggestion.name}
                        </p>
                        <div
                          dir="ltr"
                          className="flex items-center gap-1.5 text-sm tabular-nums"
                        >
                          <StarIcon className="size-4 fill-amber-400 text-amber-400" />
                          <span>{suggestion.rating}</span>
                          <span className="text-muted-foreground">
                            ({suggestion.reviews})
                          </span>
                        </div>
                        <p
                          dir="ltr"
                          className="text-lg font-medium tabular-nums"
                        >
                          ${suggestion.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {!isEmpty && (
              <div className="flex w-full min-w-0 flex-col gap-3 text-base text-muted-foreground">
                <div className="flex items-center gap-4">
                  <p className="min-w-0 flex-1">{subtotalLabel}</p>
                  <p dir="ltr" className="shrink-0 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="min-w-0 flex-1">{shippingLabel}</p>
                  <p dir="ltr" className="shrink-0 tabular-nums">
                    {shippingFee > 0
                      ? `$${shippingFee.toFixed(2)}`
                      : shippingFree}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="min-w-0 flex-1">{taxLabel}</p>
                  <p dir="ltr" className="shrink-0 tabular-nums">
                    ${tax.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DrawerFooter className="shrink-0 border-t border-border p-6">
          {isEmpty ? (
            <Button
              asChild
              className="h-12 w-full cursor-pointer hover:bg-primary/80"
            >
              <Link href={emptyCtaHref}>{emptyCta}</Link>
            </Button>
          ) : (
            <Button className="h-12 w-full cursor-pointer hover:bg-primary/80">
              {checkoutLabel}
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/** Demo block — full “View Cart” trigger with sample lines (shadcn-space drawer-02). */
const ShoppingCartDrawerDemo = () => (
  <ShoppingCartDrawer initialItems={SAMPLE_CART_ITEMS} persist={false} />
);

export default ShoppingCartDrawerDemo;
