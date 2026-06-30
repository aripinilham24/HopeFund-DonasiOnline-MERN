import {
  UserPlus, FileText, Share2, DollarSign, CheckCircle,
  Shield, Clock, TrendingUp, Users, Heart, CreditCard, Bell,
  Search, PlusCircle, ArrowRight
} from 'lucide-react';
import { Title } from "react-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {
  const donaturSteps = [
    { icon: Search, title: 'Temukan Kampanye', description: 'Jelajahi berbagai kampanye donasi yang tersedia. Gunakan fitur pencarian dan filter untuk menemukan kampanye yang sesuai dengan minat Anda.' },
    { icon: FileText, title: 'Baca Detail Kampanye', description: 'Pelajari informasi lengkap tentang kampanye, termasuk tujuan, target dana, dan update perkembangan dari penggalang dana.' },
    { icon: DollarSign, title: 'Pilih Nominal Donasi', description: 'Tentukan jumlah donasi yang ingin Anda berikan. Anda bisa memilih nominal yang sudah disarankan atau memasukkan nominal sendiri.' },
    { icon: CreditCard, title: 'Lakukan Pembayaran', description: 'Pilih metode pembayaran yang Anda inginkan. Kami mendukung berbagai metode pembayaran yang aman dan terpercaya.' },
    { icon: CheckCircle, title: 'Konfirmasi & Selesai', description: 'Setelah pembayaran berhasil, Anda akan menerima konfirmasi melalui email dan dapat melacak kontribusi Anda di dashboard.' },
  ];

  const penggalangSteps = [
    { icon: UserPlus, title: 'Daftar Akun', description: 'Buat akun HopeFund dengan mengisi data diri lengkap. Verifikasi email Anda untuk keamanan dan kepercayaan.' },
    { icon: PlusCircle, title: 'Buat Kampanye', description: 'Isi formulir kampanye dengan lengkap. Jelaskan tujuan, target dana, dan mengapa orang harus mendukung kampanye Anda.' },
    { icon: FileText, title: 'Upload Dokumen', description: 'Upload dokumen pendukung seperti foto, video, atau dokumen lain yang memperkuat kredibilitas kampanye Anda.' },
    { icon: Share2, title: 'Promosikan Kampanye', description: 'Bagikan kampanye Anda ke media sosial, keluarga, dan teman. Semakin banyak yang tahu, semakin cepat target tercapai.' },
    { icon: Bell, title: 'Monitor & Update', description: 'Pantau perkembangan donasi dan berikan update rutin kepada donatur tentang penggunaan dana yang telah terkumpul.' },
    { icon: TrendingUp, title: 'Tarik Dana', description: 'Setelah target tercapai atau waktu kampanye selesai, ajukan pencairan dana ke rekening yang sudah didaftarkan.' },
  ];

  const features = [
    { icon: Shield, title: 'Keamanan Terjamin', description: 'Sistem enkripsi dan verifikasi berlapis untuk melindungi data dan transaksi Anda' },
    { icon: Clock, title: 'Proses Cepat', description: 'Donasi atau pencairan dana diproses dengan cepat dan efisien' },
    { icon: Users, title: 'Komunitas Aktif', description: 'Bergabung dengan ribuan orang yang peduli dan saling mendukung' },
    { icon: Heart, title: 'Transparan', description: 'Lacak setiap donasi dan penggunaan dana secara real-time' },
  ];

  const faqs = [
    { question: 'Apakah ada biaya untuk berdonasi?', answer: 'Tidak ada biaya tambahan untuk donatur. Namun, kami mengenakan biaya platform sebesar 5% dari total dana terkumpul untuk biaya operasional.' },
    { question: 'Berapa lama proses pencairan dana?', answer: 'Proses pencairan dana biasanya memakan waktu 3-5 hari kerja setelah pengajuan disetujui oleh tim kami.' },
    { question: 'Apakah kampanye saya akan diverifikasi?', answer: 'Ya, setiap kampanye akan melalui proses verifikasi oleh tim kami untuk memastikan keabsahan dan kredibilitas kampanye.' },
    { question: 'Metode pembayaran apa saja yang tersedia?', answer: 'Kami mendukung berbagai metode pembayaran seperti transfer bank, e-wallet (GoPay, OVO, Dana), dan virtual account.' },
  ];

  return (
    <>
      <Title>Cara Kerja</Title>
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Cara Kerja HopeFund</h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-4">
            Mudah, Cepat, dan Aman. Pelajari bagaimana HopeFund menghubungkan kepedulian Anda dengan mereka yang membutuhkan.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <Tabs defaultValue="donatur" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-12">
              <TabsTrigger value="donatur">Untuk Donatur</TabsTrigger>
              <TabsTrigger value="penggalang">Untuk Penggalang Dana</TabsTrigger>
            </TabsList>

            {[donaturSteps, penggalangSteps].map((steps, tabIndex) => (
              <TabsContent key={tabIndex} value={tabIndex === 0 ? "donatur" : "penggalang"} className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 group">
                      <div className="flex-shrink-0 lg:mt-2">
                        <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Icon className="h-7 w-7 text-primary-foreground" />
                        </div>
                      </div>
                      <Card className="flex-1 w-full">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="text-base font-bold">0{index + 1}</Badge>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                      {index < steps.length - 1 && (
                        <ArrowRight className="hidden lg:block h-6 w-6 text-muted-foreground flex-shrink-0 mt-6" />
                      )}
                    </div>
                  );
                })}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="bg-muted/50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">Mengapa HopeFund?</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center p-6 lg:p-8">
                    <CardContent className="flex flex-col items-center gap-3 p-0">
                      <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Pertanyaan Umum</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded" />
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Siap Memulai Perjalanan Kebaikan?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto px-4">
            Bergabunglah dengan ribuan orang yang telah merasakan kemudahan berbagi melalui HopeFund
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="/donation">Mulai Berdonasi</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/create-donation">Galang Dana Sekarang</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
