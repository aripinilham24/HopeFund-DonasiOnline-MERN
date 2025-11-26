import { Heart, Target, Users, Shield, TrendingUp, Award } from 'lucide-react';
import {Title} from "react-head";

export default function About() {
  const stats = [
    { label: 'Total Donasi', value: '10M+', icon: TrendingUp },
    { label: 'Penggalang Dana', value: '5,000+', icon: Users },
    { label: 'Kampanye Berhasil', value: '15,000+', icon: Award },
    { label: 'Kepercayaan', value: '100%', icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Transparansi',
      description: 'Kami berkomitmen untuk memberikan informasi yang jelas dan terbuka tentang setiap kampanye donasi.'
    },
    {
      icon: Shield,
      title: 'Keamanan',
      description: 'Platform kami menggunakan teknologi keamanan terkini untuk melindungi data dan transaksi Anda.'
    },
    {
      icon: Users,
      title: 'Komunitas',
      description: 'Membangun komunitas peduli yang saling mendukung dalam berbagai kebutuhan sosial.'
    },
    {
      icon: Target,
      title: 'Dampak Nyata',
      description: 'Setiap donasi yang terkumpul langsung disalurkan untuk memberikan dampak positif yang nyata.'
    }
  ];

  const team = [
    {
      name: 'Ahmad Santoso',
      role: 'CEO & Founder',
      image: 'https://ui-avatars.com/api/?name=Ahmad+Santoso&background=10b981&color=fff&size=200'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=3b82f6&color=fff&size=200'
    },
    {
      name: 'Budi Prasetyo',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=Budi+Prasetyo&background=8b5cf6&color=fff&size=200'
    },
    {
      name: 'Dewi Lestari',
      role: 'Community Manager',
      image: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=ec4899&color=fff&size=200'
    }
  ];

  return (
    <>
    <Title>About</Title>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Tentang HopeFund</h1>
            <p className="text-xl leading-relaxed opacity-90">
              Platform donasi online terpercaya yang menghubungkan kepedulian dengan kebutuhan. 
              Bersama kita wujudkan harapan dan perubahan nyata bagi mereka yang membutuhkan.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
                <Icon className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Misi Kami</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              HopeFund hadir sebagai jembatan kepedulian yang memudahkan setiap orang untuk berbagi dan membantu 
              sesama. Kami percaya bahwa setiap kebaikan, sekecil apapun, memiliki kekuatan untuk mengubah hidup.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Dengan teknologi MERN Stack (MongoDB, Express.js, React.js, Node.js), kami menghadirkan platform 
              yang aman, transparan, dan mudah digunakan untuk menggalang dana bagi berbagai kebutuhan seperti 
              kesehatan, pendidikan, bencana alam, dan kegiatan sosial lainnya.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bersama HopeFund, mari kita ciptakan gelombang kebaikan yang membawa harapan dan perubahan positif 
              bagi Indonesia yang lebih baik.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nilai-Nilai Kami</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-all hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dibalik HopeFund, ada tim yang berdedikasi untuk memastikan setiap donasi tersalurkan dengan baik
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all hover:shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Berbagi Kebaikan?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan orang yang telah menyalurkan kepedulian melalui HopeFund
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Mulai Donasi
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all">
              Buat Kampanye
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}