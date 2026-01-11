export interface FeedbackModalProps {
  success: boolean;
  error: string;
}

export default function FeedbackModal({ success, error }: FeedbackModalProps) {
  return (
    <dialog id="feedback_modal" className="modal">
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg">{success ? "Success" : "Error"}</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {success ? "OTP sent to your email." : error}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
