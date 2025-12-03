import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [rentalDays, setRentalDays] = useState([3]);
  const [selectedCar, setSelectedCar] = useState('economy');
  const [additionalServices, setAdditionalServices] = useState({
    childSeat: false,
    gps: false,
    insurance: false,
    delivery: false,
  });

  const cars = [
    {
      id: 'economy',
      name: 'Эконом класс',
      model: 'Hyundai Solaris, Kia Rio',
      price: 1800,
      image: 'https://cdn.poehali.dev/projects/7081d966-6569-4da7-9a68-26d613ba752e/files/eedf9503-3cac-4f82-81b2-f76f22091d59.jpg',
      features: ['АКПП', 'Кондиционер', 'Bluetooth'],
    },
    {
      id: 'comfort',
      name: 'Комфорт класс',
      model: 'Toyota Camry, VW Passat',
      price: 3200,
      image: 'https://cdn.poehali.dev/projects/7081d966-6569-4da7-9a68-26d613ba752e/files/15e2659a-71e9-4e04-ba2a-ad3c75bc0383.jpg',
      features: ['АКПП', 'Климат', 'Круиз-контроль', 'Камера'],
    },
    {
      id: 'premium',
      name: 'Премиум класс',
      model: 'BMW X5, Audi Q7',
      price: 5500,
      image: 'https://cdn.poehali.dev/projects/7081d966-6569-4da7-9a68-26d613ba752e/files/e20390c0-f708-4dc9-958d-f48185f6d73a.jpg',
      features: ['АКПП', 'Панорама', 'Массаж', 'Премиум аудио'],
    },
  ];

  const services = [
    { id: 'childSeat', label: 'Детское кресло', price: 300 },
    { id: 'gps', label: 'GPS-навигатор', price: 200 },
    { id: 'insurance', label: 'Полная страховка', price: 800 },
    { id: 'delivery', label: 'Доставка авто', price: 500 },
  ];

  const calculateTotal = () => {
    const carPrice = cars.find(c => c.id === selectedCar)?.price || 0;
    const servicesTotal = services.reduce((sum, service) => {
      return sum + (additionalServices[service.id as keyof typeof additionalServices] ? service.price : 0);
    }, 0);
    return (carPrice * rentalDays[0]) + (servicesTotal * rentalDays[0]);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Car" size={28} className="text-primary" />
            <span className="text-2xl font-bold">AutoRent SPB</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('fleet')} className="hover:text-primary transition-colors">Автопарк</button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-primary transition-colors">Калькулятор</button>
            <button onClick={() => scrollToSection('tariffs')} className="hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </div>
          <Button onClick={() => scrollToSection('contacts')}>
            <Icon name="Phone" size={18} className="mr-2" />
            Позвонить
          </Button>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto text-center animate-fade-in-up">
          <Badge className="mb-4 text-sm px-4 py-1" variant="secondary">
            Работаем с 2015 года
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Аренда авто
            <br />
            <span className="text-primary">в Санкт-Петербурге</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Широкий выбор автомобилей, прозрачные цены и быстрое оформление. 
            От эконом до премиум класса.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" onClick={() => scrollToSection('calculator')}>
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость
            </Button>
            <Button size="lg" variant="outline" className="text-lg" onClick={() => scrollToSection('fleet')}>
              Смотреть автопарк
            </Button>
          </div>
        </div>
      </section>

      <section id="fleet" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наш автопарк</h2>
            <p className="text-muted-foreground text-lg">Все автомобили в отличном состоянии и полностью застрахованы</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{car.name}</CardTitle>
                  <CardDescription className="text-base">{car.model}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature) => (
                        <Badge key={feature} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                    <div className="flex items-baseline justify-between pt-4 border-t">
                      <span className="text-3xl font-bold text-primary">{car.price}₽</span>
                      <span className="text-muted-foreground">/сутки</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Calculator" size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-muted-foreground text-lg">Рассчитайте точную стоимость аренды с учётом всех услуг</p>
          </div>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>Выберите параметры аренды</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium">Срок аренды: {rentalDays[0]} {rentalDays[0] === 1 ? 'день' : rentalDays[0] < 5 ? 'дня' : 'дней'}</label>
                <Slider
                  value={rentalDays}
                  onValueChange={setRentalDays}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 день</span>
                  <span>30 дней</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Выберите класс автомобиля</label>
                <div className="grid gap-3">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCar(car.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                        selectedCar === car.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{car.name}</div>
                          <div className="text-sm text-muted-foreground">{car.model}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">{car.price}₽</div>
                          <div className="text-sm text-muted-foreground">за сутки</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Дополнительные услуги</label>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={service.id}
                          checked={additionalServices[service.id as keyof typeof additionalServices]}
                          onCheckedChange={(checked) =>
                            setAdditionalServices({ ...additionalServices, [service.id]: checked })
                          }
                        />
                        <label htmlFor={service.id} className="cursor-pointer font-medium">
                          {service.label}
                        </label>
                      </div>
                      <span className="text-primary font-semibold">+{service.price}₽/сутки</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Итого за {rentalDays[0]} {rentalDays[0] === 1 ? 'день' : rentalDays[0] < 5 ? 'дня' : 'дней'}:</span>
                  <span className="text-4xl font-bold text-primary">{calculateTotal().toLocaleString()}₽</span>
                </div>
                <Button size="lg" className="w-full text-lg" onClick={() => scrollToSection('contacts')}>
                  <Icon name="Send" size={20} className="mr-2" />
                  Оформить заявку
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="tariffs" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифы</h2>
            <p className="text-muted-foreground text-lg">Чем дольше аренда — тем выгоднее</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { days: '1-2', discount: '0%', badge: '' },
              { days: '3-6', discount: '-5%', badge: 'Популярно' },
              { days: '7-13', discount: '-10%', badge: 'Выгодно' },
              { days: '14+', discount: '-15%', badge: 'Максимум' },
            ].map((tariff, index) => (
              <Card key={index} className={`text-center hover:shadow-lg transition-all hover:-translate-y-1 ${tariff.badge === 'Выгодно' ? 'border-accent border-2' : ''}`}>
                <CardHeader>
                  {tariff.badge && (
                    <Badge className="mb-2 mx-auto" variant={tariff.badge === 'Максимум' ? 'default' : 'secondary'}>
                      {tariff.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl">{tariff.days} дней</CardTitle>
                  <CardDescription className="text-3xl font-bold text-accent">{tariff.discount}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы об аренде</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white px-6 rounded-lg border">
              <AccordionTrigger className="text-left hover:no-underline">
                Какие документы нужны для аренды?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Для аренды необходимы: паспорт РФ, водительское удостоверение (стаж от 2 лет) и банковская карта для залога.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white px-6 rounded-lg border">
              <AccordionTrigger className="text-left hover:no-underline">
                Можно ли арендовать авто для выезда за границу?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, выезд в страны Балтии и Финляндию возможен. Необходимо уведомить нас заранее и оформить дополнительные документы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white px-6 rounded-lg border">
              <AccordionTrigger className="text-left hover:no-underline">
                Что входит в стоимость аренды?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                В базовую стоимость входит: полный бак топлива, ОСАГО, техподдержка 24/7. Пробег без ограничений.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white px-6 rounded-lg border">
              <AccordionTrigger className="text-left hover:no-underline">
                Есть ли залог и какой его размер?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, залог блокируется на карте и составляет 10 000₽ для эконом-класса, 20 000₽ для комфорт и 30 000₽ для премиум.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white px-6 rounded-lg border">
              <AccordionTrigger className="text-left hover:no-underline">
                Можно ли продлить аренду?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Конечно! Позвоните нам минимум за 24 часа до окончания аренды, и мы продлим договор по текущему тарифу.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-secondary-foreground/80 text-lg">Свяжитесь с нами удобным способом</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Icon name="Phone" size={32} className="mx-auto mb-2 text-primary" />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+78123456789" className="text-lg font-semibold hover:text-primary transition-colors">
                  +7 (812) 345-67-89
                </a>
                <p className="text-sm text-muted-foreground mt-2">Ежедневно 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Icon name="Mail" size={32} className="mx-auto mb-2 text-primary" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@autorent-spb.ru" className="text-lg font-semibold hover:text-primary transition-colors">
                  info@autorent-spb.ru
                </a>
                <p className="text-sm text-muted-foreground mt-2">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Icon name="MapPin" size={32} className="mx-auto mb-2 text-primary" />
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Невский проспект, 28</p>
                <p className="text-sm text-muted-foreground mt-2">Санкт-Петербург</p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-center">Условия аренды</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p>Возраст водителя от 23 лет, стаж вождения от 2 лет</p>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p>Минимальный срок аренды — 1 сутки</p>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p>Все автомобили проходят техосмотр перед каждой выдачей</p>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p>Круглосуточная техподдержка и эвакуация при необходимости</p>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p>Возврат залога в течение 3 рабочих дней после окончания аренды</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 bg-primary/5 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2024 AutoRent SPB. Все права защищены.</p>
          <p className="text-sm">ИП Иванов И.И. | ИНН 123456789012</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
