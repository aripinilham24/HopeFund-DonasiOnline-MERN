import { Heart, Target, Users, Shield, TrendingUp, Award } from 'lucide-react';
import { Title } from "react-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function About() {
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

  return (
    <>
      <Title>About</Title>
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tentang HopeFund</h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto px-4">
            Platform donasi online terpercaya yang menghubungkan kepedulian dengan kebutuhan.
            Bersama kita wujudkan harapan dan perubahan nyata bagi mereka yang membutuhkan.
          </p>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center p-4 lg:p-6">
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <Icon className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />
                    <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Misi Kami</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded" />
          </div>

          <Card className="p-6 lg:p-10">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
              HopeFund hadir sebagai jembatan kepedulian yang memudahkan setiap orang untuk berbagi dan membantu
              sesama. Kami percaya bahwa setiap kebaikan, sekecil apapun, memiliki kekuatan untuk mengubah hidup.
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
              Dengan teknologi MERN Stack (MongoDB, Express.js, React.js, Node.js), kami menghadirkan platform
              yang aman, transparan, dan mudah digunakan untuk menggalang dana bagi berbagai kebutuhan seperti
              kesehatan, pendidikan, bencana alam, dan kegiatan sosial lainnya.
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Bersama HopeFund, mari kita ciptakan gelombang kebaikan yang membawa harapan dan perubahan positif
              bagi Indonesia yang lebih baik.
            </p>
          </Card>
        </div>

        <div className="bg-muted/50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">Nilai-Nilai Kami</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center p-6 lg:p-8">
                    <CardContent className="flex flex-col items-center gap-3 p-0">
                      <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-bold">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Siap Berbagi Kebaikan?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto px-4">
            Bergabunglah dengan ribuan orang yang telah menyalurkan kepedulian melalui HopeFund
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button variant="secondary" size="lg" asChild>
              <a href="/donation">Mulai Donasi</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/create-donation">Buat Kampanye</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
