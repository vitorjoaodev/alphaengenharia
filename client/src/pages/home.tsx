import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Building2, 
  Palette, 
  Zap, 
  Factory, 
  CheckCircle, 
  ClipboardList,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Settings
} from "lucide-react";
import logoPath from "@assets/Design sem nome - 2025-08-24T151648.371_1756059411457.png";
import residencialImg from "@assets/IMG_4762_1756773773536.jpg";
import comercialImg from "@assets/images (23)_1756773928056.jpg";
import industrialImg from "@assets/vista-da-planta-de-nutricao-especializada-da-danone-em-pocos-de-caldas-mg-1625683793474_v2_900x506 (1)_1756774049850.png";
import franquiasImg from "@assets/Alguns Dos Nossos Clientes - 4_1756774772618.png";
import corporativoImg from "@assets/Design Sem Nome - 2_1756774812770.png";
import saudeImg from "@assets/Design Sem Nome - 3_1756774936168.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Sucesso!",
        description: data.message,
      });
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-light-silver">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3" data-testid="logo-section">
            <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center">
              <img src={logoPath} alt="Luciane Engenharia Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-navy font-bold text-lg">Alpha Prime</h1>
              <p className="text-sm text-gray-600">ENGENHARIA</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" data-testid="desktop-nav">
            <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-inicio">
              Início
            </button>
            <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-sobre">
              Sobre
            </button>
            <button onClick={() => scrollToSection('servicos')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-servicos">
              Serviços
            </button>
            <button onClick={() => scrollToSection('setores')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-setores">
              Setores
            </button>
            <button onClick={() => scrollToSection('diferenciais')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-diferenciais">
              Diferenciais
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium" data-testid="nav-contato">
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-light-silver" data-testid="mobile-nav">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-inicio">
                Início
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-sobre">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-servicos">
                Serviços
              </button>
              <button onClick={() => scrollToSection('setores')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-setores">
                Setores
              </button>
              <button onClick={() => scrollToSection('diferenciais')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-diferenciais">
                Diferenciais
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-navy transition-colors duration-300 font-medium text-left" data-testid="mobile-nav-contato">
                Contato
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50" data-testid="hero-section">
        <div className="container mx-auto px-4 text-center">
          {/* Large Logo Display */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-xl border-2 border-navy">
              <img src={logoPath} alt="Alpha Prime Engenharia" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-navy mb-4" data-testid="hero-title">
            Alpha Prime Engenharia
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
            Excelência técnica em engenharia e arquitetura
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('contato')} 
              className="bg-navy text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-silver hover:text-navy transition-all duration-300 shadow-lg"
              data-testid="hero-cta-button"
            >
              Solicite um orçamento
            </Button>
            <Button 
              onClick={() => scrollToSection('sobre')} 
              variant="outline"
              className="border-navy text-navy px-8 py-4 rounded-xl font-semibold text-lg hover:bg-navy hover:text-white transition-all duration-300 shadow-lg"
              data-testid="hero-saiba-mais-button"
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-white" data-testid="about-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="about-title">Sobre Nós</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center" data-testid="about-description">
              A Alpha Prime Engenharia atua com projetos estruturais, arquitetura, franquias, indústrias e consultoria, oferecendo soluções completas com foco em qualidade, prazo e inovação. Nossa equipe garante excelência técnica em todas as etapas, do planejamento à execução.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-gray-50" data-testid="services-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="services-title">Nossos Serviços</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-engenharia">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Engenharia Civil</h3>
                <p className="text-gray-600">Estruturas, fundações, instalações prediais, supervisão de obras.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-arquitetura">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Arquitetura</h3>
                <p className="text-gray-600">Projetos arquitetônicos, interiores, residenciais e paisagismo.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-franquias">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Franquias</h3>
                <p className="text-gray-600">Padronização, fast food, retail.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-industrial">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Projetos Industriais</h3>
                <p className="text-gray-600">Plantas industriais, galpões, logística.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-consultoria">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Consultoria</h3>
                <p className="text-gray-600">Avaliação técnica, viabilidade, otimização.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="service-card-gerenciamento">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Gerenciamento</h3>
                <p className="text-gray-600">Planejamento, acompanhamento de obra, execução, controle de qualidade.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="setores" className="py-16 bg-white" data-testid="sectors-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="sectors-title">Setores Atendidos</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="sector-construtoras">
              <div className="w-20 h-20 bg-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Construtoras e Grandes Obras</h3>
            </div>

            <div className="text-center" data-testid="sector-varejo">
              <div className="w-20 h-20 bg-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Varejo e Redes Nacionais</h3>
            </div>

            <div className="text-center" data-testid="sector-saude">
              <div className="w-20 h-20 bg-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Saúde (Hospitais e Clínicas)</h3>
            </div>

            <div className="text-center" data-testid="sector-industrias">
              <div className="w-20 h-20 bg-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="w-10 h-10 text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Indústrias (Diversos Setores)</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-16 bg-gray-50" data-testid="projects-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="projects-title">Alguns dos Nossos Clientes e Projetos</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Residencial", description: "Projetos residenciais com arquitetura moderna, personalizada e funcional, pensados para unir conforto, estética e valorização do imóvel.", testId: "project-residencial", image: residencialImg },
              { title: "Comercial", description: "Soluções de arquitetura e engenharia para ambientes comerciais modernos, com foco em eficiência e experiência do cliente.", testId: "project-comercial", image: comercialImg },
              { title: "Industrial", description: "Projetos industriais que priorizam eficiência, segurança e funcionalidade, atendendo às demandas de cada operação. Atendemos a fábrica da Danone e grandes empresas do setor.", testId: "project-industrial", image: industrialImg },
              { title: "Franquias", description: "Padronização e projetos para redes de franquias, garantindo eficiência e identidade.", testId: "project-franquias", image: franquiasImg },
              { title: "Corporativo", description: "Projetos corporativos inteligentes, combinando design moderno e funcionalidade.", testId: "project-corporativo", image: corporativoImg },
              { title: "Saúde", description: "Projetos especializados para hospitais, Santa Casas e clínicas, garantindo eficiência, segurança e funcionalidade.", testId: "project-saude", image: saudeImg }
            ].map((project, index) => (
              <Card key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" data-testid={project.testId}>
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-16 bg-gray-50" data-testid="diferenciais-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="diferenciais-title">Nossos Diferenciais</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Diferencial 1 */}
            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="diferencial-card-obras-criticas">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Especialistas em Obras Críticas</h3>
                <p className="text-gray-600 leading-relaxed">Realizamos projetos complexos com precisão e segurança, garantindo a integridade de instalações críticas, onde cada detalhe faz a diferença.</p>
              </CardContent>
            </Card>

            {/* Diferencial 2 */}
            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="diferencial-card-equipe-certificada">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Equipe Certificada e Alta Tecnologia</h3>
                <p className="text-gray-600 leading-relaxed">Nossa equipe é credenciada, treinada em NRs e equipada com EPIs completos. Utilizamos tecnologias modernas para execução eficiente, segura e conforme as normas do setor.</p>
              </CardContent>
            </Card>

            {/* Diferencial 3 */}
            <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300" data-testid="diferencial-card-prazos-atendimento">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Compromisso com Prazos e Atendimento Personalizado</h3>
                <p className="text-gray-600 leading-relaxed">Cumprimos rigorosamente prazos e oferecemos atendimento dedicado, entendendo as necessidades específicas de cada cliente, garantindo tranquilidade em projetos sensíveis.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50" data-testid="gallery-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="gallery-title">Nossas Obras</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="flex overflow-x-auto space-x-6 pb-4" data-testid="gallery-container">
            {[
              { title: "Projeto Residencial", type: "Residencial" },
              { title: "Edifício Comercial", type: "Comercial" },
              { title: "Complexo Industrial", type: "Industrial" },
              { title: "Franquia Fast Food", type: "Franquia" },
              { title: "Hospital Regional", type: "Saúde" },
              { title: "Centro Logístico", type: "Logística" }
            ].map((project, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden" data-testid={`gallery-item-${index}`}>
                <div className="w-full h-48 bg-gradient-to-br from-navy to-silver flex items-center justify-center">
                  <div className="text-white text-center">
                    <Building2 className="w-12 h-12 mx-auto mb-2 opacity-75" />
                    <p className="text-sm font-medium">{project.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 bg-white" data-testid="contact-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4" data-testid="contact-title">Entre em Contato</h2>
            <div className="w-24 h-1 bg-silver mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</Label>
                  <Input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-300"
                    data-testid="input-nome"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-300"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">Telefone</Label>
                  <Input
                    type="tel"
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-300"
                    data-testid="input-telefone"
                  />
                </div>
                
                <div>
                  <Label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">Assunto</Label>
                  <Select value={formData.assunto} onValueChange={(value) => setFormData({ ...formData, assunto: value })} required>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-300" data-testid="select-assunto">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engenharia-civil">Engenharia Civil</SelectItem>
                      <SelectItem value="arquitetura">Arquitetura</SelectItem>
                      <SelectItem value="franquias">Franquias</SelectItem>
                      <SelectItem value="projetos-industriais">Projetos Industriais</SelectItem>
                      <SelectItem value="consultoria">Consultoria</SelectItem>
                      <SelectItem value="gerenciamento">Gerenciamento</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-300"
                    data-testid="textarea-mensagem"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-navy text-white py-3 px-6 rounded-lg font-semibold hover:bg-silver hover:text-navy transition-all duration-300 shadow-lg disabled:opacity-50"
                  data-testid="button-submit-form"
                >
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8" data-testid="contact-info">
              <div>
                <h3 className="text-xl font-semibold text-navy mb-6">Informações de Contato</h3>
                
                <div className="space-y-4">
                  {/* Email Section */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Mail className="w-5 h-5 text-navy mr-2" />
                      E-mails
                    </h4>
                    <div className="text-gray-600 ml-7 space-y-1">
                      <p><strong>Administração:</strong> administracao@alphaprimeengenharia.com</p>
                      <p><strong>Recursos Humanos:</strong> rh@alphaprimeengenharia.com</p>
                      <p><strong>Obras:</strong> obras@alphaprimeengenharia.com</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-navy mr-2" />
                    <div>
                      <span className="font-medium text-gray-800">Telefone:</span>
                      <span className="text-gray-600 ml-1">(11) 3917-0292</span>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-navy mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-800">Endereço:</span>
                        <p className="text-gray-600 ml-1">Av. Imperatriz Leopoldina, 845 - Vila Leopoldina<br />São Paulo - SP, 05305-011</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-navy mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-800">Horário de Atendimento:</span>
                        <div className="text-gray-600 ml-1">
                          <p>Segunda a Sexta: 08:00 - 18:00</p>
                          <p>Sábado: 08:00 - 12:00</p>
                          <p>Domingo: Fechado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo and Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <img src={logoPath} alt="Alpha Prime Engenharia" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Alpha Prime</h3>
                  <p className="text-sm text-silver">ENGENHARIA</p>
                </div>
              </div>
              <p className="text-silver text-sm">
                © 2025 Alpha Prime Engenharia. Todos os direitos reservados.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <nav className="space-y-2">
                <button onClick={() => scrollToSection('inicio')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-inicio">
                  Início
                </button>
                <button onClick={() => scrollToSection('sobre')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-sobre">
                  Sobre
                </button>
                <button onClick={() => scrollToSection('servicos')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-servicos">
                  Serviços
                </button>
                <button onClick={() => scrollToSection('setores')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-setores">
                  Setores
                </button>
                <button onClick={() => scrollToSection('diferenciais')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-diferenciais">
                  Diferenciais
                </button>
                <button onClick={() => scrollToSection('contato')} className="text-silver hover:text-white transition-colors duration-300 block text-left" data-testid="footer-link-contato">
                  Contato
                </button>
              </nav>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/alpha-prime-engenharia/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-silver rounded-full flex items-center justify-center text-navy hover:bg-white transition-colors duration-300"
                  data-testid="link-linkedin"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
