import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackButton } from "../../components/Buttoon.jsx";
import { Title } from "react-head";
import Swal from "sweetalert2";
import { api } from "../../api/axios.js";
import { useUserStore } from "../../store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DonationPage() {
  const { id } = useParams();
  const { user } = useUserStore();
  const [clientKey, setClientKey] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setTelp] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchClientKey = async () => {
      try {
        const res = await api.get("payment/config");
        setClientKey(res.data.clientKey);
      } catch (err) {
        console.log("Error fetching client key:", err);
      }
    };
    fetchClientKey();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientKey]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await api.get(`campaigns/title/${id}`);
        setCampaign(res.data.data.title);
      } catch (err) {
        console.log("Error fetching campaign:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (amount < 1000) {
      Swal.fire({
        title: "Warning!",
        text: "Masukkan nominal donasi terlebih dahulu!",
        icon: "warning",
        confirmButtonText: "OK",
        theme: "auto",
      });
      return;
    }

    if (!name || !email || !telp) {
      Swal.fire({
        title: "Warning!",
        text: "Harap isi semua data identitas!",
        icon: "warning",
        confirmButtonText: "OK",
        theme: "auto",
      });
      return;
    }
    setLoading(true);
    try {
      const resp = await api.post("payment/create", {
        donateId: `donate-${Date.now()}`,
        amount: Number(amount),
        message,
        campaignId: id,
        customer: {
          userId: user?.id || "guest",
          name,
          email,
          telp,
          anonymous,
        },
      });
      const { token } = resp.data;
      window.snap.pay(token, {
        onSuccess: function (result) {
          Swal.fire({
            title: "Success!",
            text: "Donasi berhasil!",
            icon: "success",
            confirmButtonText: "OK",
            theme: "auto",
          });
          console.log(result);
        },
        onPending: function (result) {
          Swal.fire({
            title: "Pending!",
            text: "Menunggu transaksi!",
            icon: "info",
            confirmButtonText: "OK",
            theme: "auto",
          });
          console.log(result);
        },
        onError: function (result) {
          Swal.fire({
            title: "Failed!",
            text: "Donasi gagal!",
            icon: "error",
            confirmButtonText: "OK",
            theme: "auto",
          });
          console.log(result);
        },
        onClose: function () {
          Swal.fire({
            title: "Closed Transaction!",
            text: "Kamu menutup popup tanpa menyelesaikan trnsaksi!",
            icon: "info",
            confirmButtonText: "OK",
            theme: "auto",
          });
        },
      });
    } catch (err) {
      console.error("Error saat membuat transaksi:", err);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat membuat transaksi!",
        icon: "error",
        confirmButtonText: "OK",
        theme: "auto",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="mt-25 lg:mt-10 flex flex-col items-center gap-5 text-sm lg:text-base">
        <BackButton className="absolute top-20 left-5" />
        <Skeleton className="h-8 w-64" />
        <Card className="w-full max-w-lg p-5 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </Card>
      </div>
    );
  }

  return (
    <>
      <Title>{`Donation for ${campaign}`}</Title>
      <div className="mt-25 lg:mt-10 flex flex-col items-center gap-5 text-sm lg:text-base">
        <BackButton className="absolute top-20 left-5" />
        <h2 className="font-bold text-lg">{campaign}</h2>
        <Card className="w-full max-w-lg p-5">
          <form onSubmit={handleDonate} className="flex flex-col gap-6">
            <div>
              <Label className="font-semibold mb-2 block">Nominal Donasi</Label>
              <div className="grid grid-cols-2 gap-4">
                {[30000, 50000, 100000].map((val, i) => (
                  <Label key={i} className="cursor-pointer">
                    <input
                      type="radio"
                      name="donasi"
                      value={val}
                      className="peer hidden"
                      checked={Number(amount) === val}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                        setShowInput(false);
                      }}
                    />
                    <div className="rounded-full border border-primary px-6 py-3 text-center font-semibold text-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                      Rp {val.toLocaleString()}
                    </div>
                  </Label>
                ))}
                <Label className="cursor-pointer">
                  <input
                    type="radio"
                    name="donasi"
                    value="lainnya"
                    className="peer hidden"
                    onChange={() => {
                      setShowInput(true);
                      setAmount(0);
                    }}
                  />
                  <div className="rounded-full border border-primary px-6 py-3 text-center font-semibold text-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                    Lainnya
                  </div>
                </Label>
              </div>
              <div className={`flex flex-col mt-5 ${showInput ? "" : "hidden"}`}>
                <Label htmlFor="amount">Isi nominal donasi</Label>
                <Input
                  type="number"
                  id="amount"
                  min={1000}
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  disabled={!showInput}
                  required={showInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="font-semibold">
                Dukungan dan Doa untuk campaign
              </Label>
              <textarea
                id="message"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                placeholder="tulis dukunganmu di sini"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold">Masukan Identitas Kamu di Sini</p>

              <Label htmlFor="name">
                Nama <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label htmlFor="telp">
                No. Telepon <span className="text-destructive">*</span>
              </Label>
              <Input
                type="tel"
                id="telp"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(checked) => setAnonymous(!!checked)}
              />
              <Label htmlFor="anonymous" className="cursor-pointer">Sembunyikan Nama</Label>
            </div>

            <Button type="submit" variant="outline" disabled={loading} className="w-full">
              {loading ? "Memproses..." : "Donasi Sekarang"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default DonationPage;
