import { Toaster } from "sonner";

export default function StyledToaster() {
  {
    /* 다크모드 / 라이트모드 theme props로 전달 필요 */
  }
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
  p-4 rounded-xl shadow-lg 
  text-text-primary bg-background-1 
  border border-divider-1 
  flex items-center gap-2
  `,
          error: `
  bg-error text-text-primary 
  border border-error-light
  `,
          success: `
  bg-success text-text-primary
  border border-success-light
  `,
          warning: `
  bg-warning text-text-primary
  border border-warning-light
  `,
        },
      }}
    />
  );
}
