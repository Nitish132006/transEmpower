import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { useState } from 'react';
import { modules, moduleColors, moduleNames } from './ServicesData';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const navigate = useNavigate();

  const ServiceCard = ({ service, color }: { service: any; color: string }) => (
    <Card
      className="service-card group h-full cursor-pointer flex flex-col justify-between p-6"
      onClick={() => navigate(`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
    >
      <div className="mb-4">
        <div className="flex items-start space-x-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-[var(--shadow-soft)] bg-gradient-to-r ${color} text-white`}
          >
            {service.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm">{service.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          {service.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <Button className={`w-full focus-ring group bg-gradient-to-r ${color} text-white mt-4`}>
        Learn More
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );

  // Filter modules by search or selection
  const displayedModules = Object.keys(modules).filter((key) => {
    if (selectedModule !== 'all' && selectedModule !== key) return false;
    return moduleNames[key].toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-light to-secondary text-center">
        <h1 className="text-5xl font-bold text-gradient-empowerment mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Comprehensive support across healthcare, safety, career, education, and shelter.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/20 text-center">
        <input
          type="text"
          placeholder="Search modules e.g., Health, Safety"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-6 text-sm"
        />
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button size="sm" variant={selectedModule === 'all' ? 'default' : 'outline'} onClick={() => setSelectedModule('all')}>
            All
          </Button>
          {Object.keys(modules).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={selectedModule === key ? 'default' : 'outline'}
              onClick={() => setSelectedModule(key)}
            >
              {moduleNames[key]}
            </Button>
          ))}
        </div>
      </section>

      {/* Modules */}
      {displayedModules.length === 0 ? (
        <div className="text-center py-20 text-xl font-semibold text-muted-foreground">No module found</div>
      ) : (
        displayedModules.map((key) => (
          <section key={key} className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Module Header */}
              <div className="text-center mb-20">
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)] bg-gradient-to-r ${moduleColors[key]}`}
                  >
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-6">{moduleNames[key]} Module</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {`Explore the services available in ${moduleNames[key]}. All offerings are designed to support transgender individuals in a safe, professional, and inclusive environment.`}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {modules[key].map((service: any, index: number) => (
                  <ServiceCard key={index} service={service} color={moduleColors[key]} />
                ))}
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Services;
