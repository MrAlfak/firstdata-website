import type { Lang } from "./dictionaries";

export type PanelUi = {
  nav: Record<string, string>;
  common: Record<string, string>;
  dashboard: Record<string, string>;
  projects: Record<string, string>;
  contracts: Record<string, string>;
  tickets: Record<string, string>;
  files: Record<string, string>;
  invoices: Record<string, string>;
  requests: Record<string, string>;
  notifications: Record<string, string>;
  org: Record<string, string>;
  account: Record<string, string>;
  status: {
    project: Record<string, string>;
    phase: Record<string, string>;
    ticket: Record<string, string>;
    contract: Record<string, string>;
    invoice: Record<string, string>;
    lead: Record<string, string>;
    milestone: Record<string, string>;
    approval: Record<string, string>;
  };
};

export const panelDictionaries: Record<Lang, PanelUi> = {
  en: {
    nav: {
      dashboard: "Dashboard", projects: "Projects", contracts: "Contracts", tickets: "Support tickets", files: "Files", invoices: "Invoices", requests: "My requests", notifications: "Notifications", org: "Organization", account: "Account", logout: "Sign out", backToSite: "Back to site", login: "Sign in", }, common: {
      loading: "Loading…", empty: "Nothing here yet.", save: "Save", cancel: "Cancel", submit: "Submit", download: "Download", upload: "Upload", sign: "Sign contract", approve: "Approve", reject: "Request changes", pay: "Pay", view: "View", priority: "Priority", status: "Status", project: "Project", date: "Date", amount: "Amount", allProjects: "All projects", loadFailed: "Could not load data. Please refresh.", currency: "IRR", you: "You", staff: "First Data", error: "Error", }, dashboard: {
      title: "Overview", activeProjects: "Active projects", pendingActions: "Needs your action", openTickets: "Open tickets", unpaidInvoices: "Unpaid invoices", unreadNotifications: "Unread notifications", recentUpdates: "Recent updates", needsYou: "Waiting for you", noProjects: "No projects yet", noProjectsHint: "Submit a request and we will set up your project after kickoff.", contactCta: "Submit a request", }, projects: {
      title: "My projects", phase: "Current phase", progress: "Progress", milestones: "Timeline", updates: "Updates from the team", deliveryDue: "Target delivery", pendingApprovals: "Pending approvals", projectContracts: "Contracts", projectFiles: "Files", }, contracts: {
      title: "Contracts", signed: "Signed", pending: "Awaiting signature", signConfirm: "I have read and agree to this contract.", }, tickets: {
      title: "Support tickets", new: "New ticket", subject: "Subject", message: "Message", reply: "Send reply", closed: "This ticket is closed.", }, files: {
      title: "Files", uploadHint: "Upload logos, content, or brand assets (max 10 MB).", fromYou: "Uploaded by you", fromUs: "Delivered by First Data", description: "Note (optional)", }, invoices: {
      title: "Invoices", unpaid: "Unpaid", paid: "Paid", payOnline: "Pay online", paymentSuccess: "Payment completed successfully.", paymentFailed: "Payment was not completed. Try again or contact support.", }, requests: {
      title: "My requests", received: "Received", reviewing: "Under review", replied: "Replied", converted: "Converted to project", }, notifications: {
      title: "Notifications", markAllRead: "Mark all as read", markRead: "Mark as read", }, org: {
      title: "Organization", subtitle: "Companies and teams linked to your account.", empty: "You are not assigned to an organization yet.", yourRole: "Your role", members: "Members", roleOwner: "Owner", roleManager: "Manager", roleMember: "Member", }, account: {
      title: "Account settings", name: "Full name", email: "Email", phone: "Mobile", password: "Password", newPassword: "New password", confirmPassword: "Confirm password", setPassword: "Update password", setPasswordLabel: "Set a password", currentPassword: "Current password", saved: "Saved successfully.", passwordMismatch: "Passwords do not match.", profileSection: "Profile & password", verified: "Verified", unverified: "Unverified", noEmail: "—", verifyEmailSection: "Verify email", verifyEmailHint: "Confirm your email address to secure account recovery.", sendVerifyCode: "Send verification code", verificationCode: "Verification code", confirmVerify: "Verify email", verifySent: "Verification code sent.", emailVerified: "Email verified.", changeContactSection: "Change email or mobile", changeContactHint: "We will send a code to the new contact before updating.", changeEmail: "Email", changePhone: "Mobile", newEmail: "New email", newPhone: "New mobile number", sendContactCode: "Send code", contactCodeSent: "Code sent to the new contact.", confirmChange: "Confirm change", contactUpdated: "Contact updated.", sessionsSection: "Active sessions", sessionsHint: "Devices where you are signed in. Revoke any session you do not recognize.", unknownDevice: "Unknown device", currentSession: "This device", revokeSession: "Revoke", sessionRevoked: "Session revoked.", totpSection: "Two-factor authentication", totpHint: "Add an authenticator app for an extra sign-in step.", totpSetupHint: "Scan this secret in Google Authenticator or similar, then enter a code.", totpCode: "Authenticator code", enableTotp: "Enable 2FA", disableTotp: "Disable 2FA", totpEnabled: "Two-factor authentication enabled.", totpDisabled: "Two-factor authentication disabled.", totpActive: "Two-factor authentication is active.", deleteSection: "Delete account", deleteHint: "This deactivates your account and signs you out everywhere. Type DELETE to confirm.", deleteConfirmLabel: "Type DELETE to confirm", sendDeleteOtp: "Send deletion code", deleteOtpSent: "Deletion confirmation code sent.", deleteAccount: "Delete my account", }, status: {
      project: {
        inquiry: "Inquiry", contract: "Contract", active: "In progress", delivered: "Delivered", support: "Support", closed: "Closed", }, phase: {
        consult: "Consultation", design: "Design", build: "Development", launch: "Launch", support: "Support", }, ticket: {
        open: "Open", waiting_client: "Waiting for you", in_progress: "In progress", closed: "Closed", }, contract: { pending: "Pending", signed: "Signed", expired: "Expired" }, invoice: { unpaid: "Unpaid", paid: "Paid", cancelled: "Cancelled" }, lead: {
        received: "Received", reviewing: "Reviewing", replied: "Replied", converted: "Project started", }, milestone: {
        pending: "Upcoming", active: "In progress", done: "Done", skipped: "Skipped", }, approval: { pending: "Pending", approved: "Approved", rejected: "Changes requested" }, }, }, fa: {
    nav: {
      dashboard: "داشبورد", projects: "پروژه‌ها", contracts: "قراردادها", tickets: "تیکت پشتیبانی", files: "فایل‌ها", invoices: "فاکتورها", requests: "درخواست‌های من", notifications: "اعلان‌ها", org: "سازمان", account: "حساب کاربری", logout: "خروج", backToSite: "بازگشت به سایت", login: "ورود", }, common: {
      loading: "در حال بارگذاری…", empty: "هنوز موردی ثبت نشده.", save: "ذخیره", cancel: "انصراف", submit: "ارسال", download: "دانلود", upload: "آپلود", sign: "امضای قرارداد", approve: "تأیید", reject: "درخواست اصلاح", pay: "پرداخت", view: "مشاهده", priority: "اولویت", status: "وضعیت", project: "پروژه", date: "تاریخ", amount: "مبلغ", allProjects: "همه پروژه‌ها", loadFailed: "بارگذاری داده ناموفق بود. صفحه را رفرش کنید.", currency: "ریال", you: "شما", staff: "اولین دیتا", error: "خطا", }, dashboard: {
      title: "خلاصه", activeProjects: "پروژه فعال", pendingActions: "نیاز به اقدام شما", openTickets: "تیکت باز", unpaidInvoices: "فاکتور پرداخت‌نشده", unreadNotifications: "اعلان خوانده‌نشده", recentUpdates: "آخرین به‌روزرسانی‌ها", needsYou: "منتظر شما", noProjects: "هنوز پروژه‌ای ندارید", noProjectsHint: "درخواست بدهید؛ پس از شروع همکاری پروژه اینجا نمایش داده می‌شود.", contactCta: "ثبت درخواست", }, projects: {
      title: "پروژه‌های من", phase: "فاز فعلی", progress: "پیشرفت", milestones: "زمان‌بندی", updates: "گزارش تیم", deliveryDue: "تحویل تقریبی", pendingApprovals: "در انتظار تأیید شما", projectContracts: "قراردادها", projectFiles: "فایل‌ها", }, contracts: {
      title: "قراردادها", signed: "امضا شده", pending: "در انتظار امضا", signConfirm: "قرارداد را خواندم و می‌پذیرم.", }, tickets: {
      title: "تیکت پشتیبانی", new: "تیکت جدید", subject: "موضوع", message: "پیام", reply: "ارسال پاسخ", closed: "این تیکت بسته شده است.", }, files: {
      title: "فایل‌ها", uploadHint: "لوگو، محتوا یا فایل برند آپلود کنید (حداکثر ۱۰ مگابایت).", fromYou: "آپلود شما", fromUs: "تحویل اولین دیتا", description: "توضیح (اختیاری)", }, invoices: {
      title: "فاکتورها", unpaid: "پرداخت‌نشده", paid: "پرداخت‌شده", payOnline: "پرداخت آنلاین", paymentSuccess: "پرداخت با موفقیت انجام شد.", paymentFailed: "پرداخت انجام نشد. دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.", }, requests: {
      title: "درخواست‌های من", received: "دریافت شد", reviewing: "در حال بررسی", replied: "پاسخ داده شد", converted: "تبدیل به پروژه", }, notifications: {
      title: "اعلان‌ها", markAllRead: "علامت همه به‌عنوان خوانده‌شده", markRead: "علامت خوانده‌شده", }, org: {
      title: "سازمان", subtitle: "شرکت‌ها و تیم‌های مرتبط با حساب شما.", empty: "هنوز به سازمانی اختصاص داده نشده‌اید.", yourRole: "نقش شما", members: "اعضا", roleOwner: "مالک", roleManager: "مدیر", roleMember: "عضو", }, account: {
      title: "تنظیمات حساب", name: "نام", email: "ایمیل", phone: "موبایل", password: "رمز عبور", newPassword: "رمز جدید", confirmPassword: "تکرار رمز", setPassword: "به‌روزرسانی رمز", setPasswordLabel: "تعیین رمز عبور", currentPassword: "رمز فعلی", saved: "با موفقیت ذخیره شد.", passwordMismatch: "رمزها یکسان نیستند.", profileSection: "پروفایل و رمز", verified: "تأیید شده", unverified: "تأیید نشده", noEmail: "—", verifyEmailSection: "تأیید ایمیل", verifyEmailHint: "ایمیل خود را تأیید کنید تا بازیابی حساب امن‌تر شود.", sendVerifyCode: "ارسال کد تأیید", verificationCode: "کد تأیید", confirmVerify: "تأیید ایمیل", verifySent: "کد تأیید ارسال شد.", emailVerified: "ایمیل تأیید شد.", changeContactSection: "تغییر ایمیل یا موبایل", changeContactHint: "قبل از به‌روزرسانی، کد به تماس جدید ارسال می‌شود.", changeEmail: "ایمیل", changePhone: "موبایل", newEmail: "ایمیل جدید", newPhone: "شماره موبایل جدید", sendContactCode: "ارسال کد", contactCodeSent: "کد به تماس جدید ارسال شد.", confirmChange: "تأیید تغییر", contactUpdated: "اطلاعات تماس به‌روز شد.", sessionsSection: "نشست‌های فعال", sessionsHint: "دستگاه‌هایی که وارد شده‌اید. نشست ناشناس را لغو کنید.", unknownDevice: "دستگاه ناشناس", currentSession: "این دستگاه", revokeSession: "لغو", sessionRevoked: "نشست لغو شد.", totpSection: "احراز هویت دو مرحله‌ای", totpHint: "برای ورود امن‌تر، اپ Authenticator اضافه کنید.", totpSetupHint: "این Secret را در Google Authenticator اسکن کنید و کد را وارد کنید.", totpCode: "کد Authenticator", enableTotp: "فعال‌سازی 2FA", disableTotp: "غیرفعال‌سازی 2FA", totpEnabled: "احراز هویت دو مرحله‌ای فعال شد.", totpDisabled: "احراز هویت دو مرحله‌ای غیرفعال شد.", totpActive: "احراز هویت دو مرحله‌ای فعال است.", deleteSection: "حذف حساب", deleteHint: "حساب غیرفعال می‌شود و از همه دستگاه‌ها خارج می‌شوید. DELETE را تایپ کنید.", deleteConfirmLabel: "DELETE را تایپ کنید", sendDeleteOtp: "ارسال کد حذف", deleteOtpSent: "کد تأیید حذف ارسال شد.", deleteAccount: "حذف حساب من", }, status: {
      project: {
        inquiry: "استعلام", contract: "قرارداد", active: "در حال اجرا", delivered: "تحویل شده", support: "پشتیبانی", closed: "بسته", }, phase: {
        consult: "مشاوره", design: "طراحی", build: "توسعه", launch: "راه‌اندازی", support: "پشتیبانی", }, ticket: {
        open: "باز", waiting_client: "منتظر پاسخ شما", in_progress: "در حال بررسی", closed: "بسته", }, contract: { pending: "در انتظار", signed: "امضا شده", expired: "منقضی" }, invoice: { unpaid: "پرداخت‌نشده", paid: "پرداخت‌شده", cancelled: "لغو شده" }, lead: {
        received: "دریافت شد", reviewing: "در حال بررسی", replied: "پاسخ داده شد", converted: "پروژه شروع شد", }, milestone: {
        pending: "آینده", active: "در جریان", done: "انجام شد", skipped: "رد شد", }, approval: { pending: "در انتظار", approved: "تأیید شد", rejected: "اصلاح درخواست شد" }, }, }, };
