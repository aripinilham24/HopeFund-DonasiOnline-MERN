import React, { useState } from 'react';
import { 
  UserPlus, 
  FileText, 
  Share2, 
  DollarSign, 
  CheckCircle, 
  Shield,
  Clock,
  TrendingUp,
  Users,
  Heart,
  CreditCard,
  Bell,
  Search,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import {Title} from "react-head";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('donatur');
  const mobile = window.innerWidth < 640;

  const donaturSteps = [
    {
      icon: Search,
      title: 'Temukan Kampanye',
      description: 'Jelajahi berbagai kampanye donasi yang tersedia. Gunakan fitur pencarian dan filter untuk menemukan kampanye yang sesuai dengan minat Anda.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Baca Detail Kampanye',
      description: 'Pelajari informasi lengkap tentang kampanye, termasuk tujuan, target dana, dan update perkembangan dari penggalang dana.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: DollarSign,
      title: 'Pilih Nominal Donasi',
      description: 'Tentukan jumlah donasi yang ingin Anda berikan. Anda bisa memilih nominal yang sudah disarankan atau memasukkan nominal sendiri.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CreditCard,
      title: 'Lakukan Pembayaran',
      description: 'Pilih metode pembayaran yang Anda inginkan. Kami mendukung berbagai metode pembayaran yang aman dan terpercaya.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CheckCircle,
      title: 'Konfirmasi & Selesai',
      description: 'Setelah pembayaran berhasil, Anda akan menerima konfirmasi melalui email dan dapat melacak kontribusi Anda di dashboard.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const penggalangSteps = [
    {
      icon: UserPlus,
      title: 'Daftar Akun',
      description: 'Buat akun HopeFund dengan mengisi data diri lengkap. Verifikasi email Anda untuk keamanan dan kepercayaan.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: PlusCircle,
      title: 'Buat Kampanye',
      description: 'Isi formulir kampanye dengan lengkap. Jelaskan tujuan, target dana, dan mengapa orang harus mendukung kampanye Anda.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: 'Upload Dokumen',
      description: 'Upload dokumen pendukung seperti foto, video, atau dokumen lain yang memperkuat kredibilitas kampanye Anda.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Share2,
      title: 'Promosikan Kampanye',
      description: 'Bagikan kampanye Anda ke media sosial, keluarga, dan teman. Semakin banyak yang tahu, semakin cepat target tercapai.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Bell,
      title: 'Monitor & Update',
      description: 'Pantau perkembangan donasi dan berikan update rutin kepada donatur tentang penggunaan dana yang telah terkumpul.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Tarik Dana',
      description: 'Setelah target tercapai atau waktu kampanye selesai, ajukan pencairan dana ke rekening yang sudah didaftarkan.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Keamanan Terjamin',
      description: 'Sistem enkripsi dan verifikasi berlapis untuk melindungi data dan transaksi Anda'
    },
    {
      icon: Clock,
      title: 'Proses Cepat',
      description: 'Donasi atau pencairan dana diproses dengan cepat dan efisien'
    },
    {
      icon: Users,
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan ribuan orang yang peduli dan saling mendukung'
    },
    {
      icon: Heart,
      title: 'Transparan',
      description: 'Lacak setiap donasi dan penggunaan dana secara real-time'
    }
  ];

  const faqs = [
    {
      question: 'Apakah ada biaya untuk berdonasi?',
      answer: 'Tidak ada biaya tambahan untuk donatur. Namun, kami mengenakan biaya platform sebesar 5% dari total dana terkumpul untuk biaya operasional.'
    },
    {
      question: 'Berapa lama proses pencairan dana?',
      answer: 'Proses pencairan dana biasanya memakan waktu 3-5 hari kerja setelah pengajuan disetujui oleh tim kami.'
    },
    {
      question: 'Apakah kampanye saya akan diverifikasi?',
      answer: 'Ya, setiap kampanye akan melalui proses verifikasi oleh tim kami untuk memastikan keabsahan dan kredibilitas kampanye.'
    },
    {
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer: 'Kami mendukung berbagai metode pembayaran seperti transfer bank, e-wallet (GoPay, OVO, Dana), dan virtual account.'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
   <>
   <Title>Cara Kerja</Title>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 mt-15">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden rounded-t">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Cara Kerja HopeFund</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Mudah, Cepat, dan Aman. Pelajari bagaimana HopeFund menghubungkan kepedulian Anda dengan mereka yang membutuhkan.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex">
          <button
            onClick={() => setActiveTab('donatur')}
            className={`flex-1 text-xs lg:text-lg py-4 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'donatur'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Untuk Donatur
          </button>
          <button
            onClick={() => setActiveTab('penggalang')}
            className={`flex-1 text-xs lg:text-lg py-4 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'penggalang'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Untuk Penggalang Dana
          </button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {activeTab === 'donatur' ? 'Langkah Berdonasi' : 'Langkah Menggalang Dana'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {(activeTab === 'donatur' ? donaturSteps : penggalangSteps).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:items-start group">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 transform group-hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-gray-300">0{index + 1}</span>
                      <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < (activeTab === 'donatur' ? donaturSteps : penggalangSteps).length - 1 && (
                    <div className="flex-shrink-0 lg:ml-8 mt-8">
                      {mobile? (
                        <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90 lg:rotate-0" />
                      ) : (
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Mengapa HopeFund?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-all hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pertanyaan Umum</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  <span className={`text-green-600 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Memulai Perjalanan Kebaikan?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan orang yang telah merasakan kemudahan berbagi melalui HopeFund
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Mulai Berdonasi
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all">
              Galang Dana Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
   </>
  );
}