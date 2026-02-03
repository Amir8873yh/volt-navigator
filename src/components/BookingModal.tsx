import { useState } from "react";
import { format } from "date-fns";
import {
  Zap,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ChargerInfo {
  id: string;
  name: string;
  address: string;
  speed: string;
  pricePerKwh: number;
  type: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  charger: ChargerInfo;
}

const timeSlots = [
  { time: "08:00", available: true },
  { time: "09:00", available: true },
  { time: "10:00", available: false },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
  { time: "20:00", available: true },
  { time: "21:00", available: true },
];

const durationOptions = [
  { minutes: 30, label: "30 min" },
  { minutes: 60, label: "1 hour" },
  { minutes: 90, label: "1.5 hours" },
  { minutes: 120, label: "2 hours" },
];

type Step = "datetime" | "payment" | "confirmation";

const BookingModal = ({ isOpen, onClose, charger }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("datetime");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const estimatedCost = ((selectedDuration / 60) * 50 * charger.pricePerKwh).toFixed(2);
  const reservationFee = 2.50;
  const totalCost = (parseFloat(estimatedCost) + reservationFee).toFixed(2);

  const resetModal = () => {
    setStep("datetime");
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSelectedDuration(60);
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setCardName("");
    setIsProcessing(false);
    setBookingComplete(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleNextStep = () => {
    if (step === "datetime" && selectedDate && selectedTime) {
      setStep("payment");
    }
  };

  const handleBackStep = () => {
    if (step === "payment") {
      setStep("datetime");
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setBookingComplete(true);
    setStep("confirmation");
  };

  const isDateTimeValid = selectedDate && selectedTime;
  const isPaymentValid = cardNumber.length >= 19 && expiry.length >= 5 && cvc.length >= 3 && cardName.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg bg-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-gradient">Book Charging Slot</span>
              <p className="text-sm font-normal text-muted-foreground mt-0.5">
                {charger.name}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Book a charging slot at {charger.name}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 py-4">
          {["datetime", "payment", "confirmation"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step === s || (step === "confirmation" && i < 2)
                    ? "bg-primary text-primary-foreground shadow-[0_0_10px_hsl(155_100%_50%/0.4)]"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step === "confirmation" && i < 2 ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-1",
                    (step === "payment" && i === 0) || step === "confirmation"
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === "datetime" && (
          <div className="space-y-6 animate-fade-in">
            {/* Charger Info */}
            <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                {charger.address}
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md">
                  <Zap className="w-3 h-3" />
                  {charger.speed}
                </span>
                <span className="text-muted-foreground">{charger.type}</span>
                <span className="text-secondary">${charger.pricePerKwh}/kWh</span>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <CalendarIcon className="w-4 h-4 text-primary" />
                Select Date
              </Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="rounded-xl border border-border/50 bg-muted/30"
                />
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="animate-fade-in">
                <Label className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  Select Time
                </Label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={cn(
                        "p-2 text-sm rounded-lg border transition-all",
                        selectedTime === slot.time
                          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_hsl(155_100%_50%/0.4)]"
                          : slot.available
                          ? "bg-muted/30 border-border/50 hover:border-primary/50 hover:bg-muted/50"
                          : "bg-muted/10 border-border/30 text-muted-foreground/50 cursor-not-allowed"
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Duration Selection */}
            {selectedTime && (
              <div className="animate-fade-in">
                <Label className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-secondary" />
                  Charging Duration
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {durationOptions.map((option) => (
                    <button
                      key={option.minutes}
                      onClick={() => setSelectedDuration(option.minutes)}
                      className={cn(
                        "p-3 text-sm rounded-lg border transition-all",
                        selectedDuration === option.minutes
                          ? "bg-secondary text-secondary-foreground border-secondary shadow-[0_0_10px_hsl(197_100%_50%/0.4)]"
                          : "bg-muted/30 border-border/50 hover:border-secondary/50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {isDateTimeValid && (
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 animate-fade-in">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Estimated Energy</span>
                  <span>~{(selectedDuration / 60) * 50} kWh</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Estimated Cost</span>
                  <span>${estimatedCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reservation Fee</span>
                  <span>${reservationFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/50 mt-3 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-gradient">${totalCost}</span>
                </div>
              </div>
            )}

            <Button
              variant="glow"
              className="w-full"
              size="lg"
              disabled={!isDateTimeValid}
              onClick={handleNextStep}
            >
              Continue to Payment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && (
          <div className="space-y-6 animate-fade-in">
            {/* Booking Summary */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium">
                  {selectedDate && format(selectedDate, "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {durationOptions.find((d) => d.minutes === selectedDuration)?.label}
                </span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                Secure payment powered by Stripe
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-1.5 bg-muted/30 border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative mt-1.5">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="pl-10 bg-muted/30 border-border/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    className="mt-1.5 bg-muted/30 border-border/50"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className="mt-1.5 bg-muted/30 border-border/50"
                  />
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount to Pay</span>
                <span className="text-2xl font-bold text-gradient">${totalCost}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBackStep} className="flex-1">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="glow"
                className="flex-1"
                disabled={!isPaymentValid || isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${totalCost}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === "confirmation" && bookingComplete && (
          <div className="text-center space-y-6 py-4 animate-fade-in">
            {/* Success Animation */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_hsl(155_100%_50%/0.5)]">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground">
                Your charging slot has been reserved
              </p>
            </div>

            {/* Booking Details */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{charger.name}</p>
                  <p className="text-sm text-muted-foreground">{charger.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {selectedDate && format(selectedDate, "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {durationOptions.find((d) => d.minutes === selectedDuration)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confirmation #</p>
                  <p className="font-medium text-primary">VF-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="glow" className="w-full" onClick={handleClose}>
                Done
              </Button>
              <Button variant="ghost" className="w-full">
                Add to Calendar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
