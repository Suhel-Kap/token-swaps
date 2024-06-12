import { ToastAction } from "../ui/toast";

export const ToastActionWrapper = ({ url }: { url: string }) => {
  return (
    <ToastAction
      altText="View on explorer"
      onClick={() => window.open(url, "_blank")}
    >
      Explorer
    </ToastAction>
  );
};
