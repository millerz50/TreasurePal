import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, RotateCcw } from "lucide-react";
import React from "react";

export interface OtpModalProps {
  otp: string;
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onResend: () => void;
  resendLoading: boolean;
}

const OtpModal: React.FC<OtpModalProps> = ({
  otp,
  onOtpChange,
  onVerify,
  onResend,
  resendLoading,
}) => {
  return (
    <dialog id="otp_modal" className="modal">
      <div className="modal-box text-center">
        <KeyRound className="mx-auto text-primary" size={48} />
        <h3 className="font-bold text-lg mt-2">Enter OTP</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Check your email for a 6-digit code.
        </p>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={onOtpChange}
          className="w-full mb-4"
        />
        <div className="modal-action flex flex-col gap-2">
          <Button className="w-full" onClick={onVerify}>
            Verify OTP
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={onResend}
            disabled={resendLoading}>
            {resendLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <RotateCcw size={16} />
            )}
            Resend OTP
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default OtpModal;
