"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Corte = { nombre: string; precio: string };
type Categoria = { titulo: string; color: string; items: Corte[] };
type Oferta = { titulo: string; descripcion: string; precio: string };

const MAPS_URL = "https://maps.app.goo.gl/otbVsFYGL3panVjf6";
const WHATSAPP_URL = "https://wa.me/5493521466165";

const categoriasPrecios: Categoria[] = [
  {
    titulo: "Cortes de pollo",
    color: "bg-[#b51f2d]",
    items: [
      { nombre: "Pollo entero", precio: "$5.800/kg" },
      { nombre: "1/4 trasero", precio: "2 kg x $11.000" },
      { nombre: "Pechuga con hueso", precio: "$10.000/kg" },
      { nombre: "Pechuga sin hueso", precio: "$11.000/kg" },
      { nombre: "Bife de pollo", precio: "$11.000/kg" },
      { nombre: "Pata muslo", precio: "$5.800/kg" },
      { nombre: "Alitas", precio: "$3.000/kg" },
      { nombre: "Menudos", precio: "$2.000/kg" },
      { nombre: "Puchero de pollo", precio: "$1.700/kg" },
      { nombre: "Milanesas", precio: "$10.000/kg" },
      { nombre: "Pechitos", precio: "$1.700/kg" },
    ],
  },
  {
    titulo: "Cortes de novillito",
    color: "bg-[#7c111d]",
    items: [
      { nombre: "Aguja", precio: "$17.000/kg" },
      { nombre: "Bocado ancho", precio: "$22.000/kg" },
      { nombre: "Bocado fino", precio: "$17.000/kg" },
      { nombre: "Bola de lomo", precio: "$24.500/kg" },
      { nombre: "Costeleta", precio: "$23.000/kg" },
      { nombre: "Costilla", precio: "$24.500/kg" },
      { nombre: "Cuadrada", precio: "$24.500/kg" },
      { nombre: "Cuadril", precio: "$26.500/kg" },
      { nombre: "Chorizo", precio: "$12.000/kg" },
      { nombre: "Falda", precio: "$17.000/kg" },
      { nombre: "Grasa", precio: "$2.000/kg" },
      { nombre: "Lomo", precio: "$28.500/kg" },
      { nombre: "Matambre", precio: "$25.500/kg" },
      { nombre: "Marucha", precio: "$21.000/kg" },
      { nombre: "Molida común", precio: "$17.000/kg" },
      { nombre: "Molida especial", precio: "$22.000/kg" },
      { nombre: "Milanesa", precio: "$20.000/kg" },
      { nombre: "Morcilla", precio: "$10.000/kg" },
      { nombre: "Nalga", precio: "$26.500/kg" },
      { nombre: "Paleta", precio: "$22.000/kg" },
      { nombre: "Peceto", precio: "$26.500/kg" },
      { nombre: "Puchero común", precio: "$7.000/kg" },
      { nombre: "Puchero especial", precio: "$14.000/kg" },
      { nombre: "Tapa de asado", precio: "$24.500/kg" },
      { nombre: "Tapa de nalga", precio: "$24.500/kg" },
      { nombre: "Vacío", precio: "$25.500/kg" },
    ],
  },
  {
    titulo: "Cortes de cerdo",
    color: "bg-[#1f6f43]",
    items: [
      { nombre: "Blando / Bondiola", precio: "$12.000/kg" },
      { nombre: "Costilla", precio: "$10.000/kg" },
      { nombre: "Costeletas", precio: "$10.000/kg" },
      { nombre: "Matambre", precio: "$17.000/kg" },
      { nombre: "Ponchito", precio: "$17.000/kg" },
    ],
  },
];

const ofertas: Oferta[] = [
  {
    titulo: "Oferta Vacuno",
    descripcion:
      "Asado 3 kg x $36.000. Incluye falda, aguja, bocado, chorizo y morcilla.",
    precio: "$36.000",
  },
  {
    titulo: "Puchero Vacuno",
    descripcion: "Puchero 2 kg a precio especial para la semana.",
    precio: "$11.000",
  },
  {
    titulo: "Oferta Cerdo",
    descripcion: "Costilla de cerdo y vacío de cerdo a precio especial.",
    precio: "$10.000/kg",
  },
  {
    titulo: "Oferta Pollo",
    descripcion: "Pata y muslo 2 kg a precio promocional.",
    precio: "$10.999,99",
  },
];

const resumenCategorias = [
  {
    title: "Novillito",
    subtitle: "Cortes vacunos seleccionados y de calidad",
    accent: "bg-[#7c111d]",
    items: categoriasPrecios[1].items.slice(0, 4),
  },
  {
    title: "Cerdo",
    subtitle: "Opciones frescas para todos los gustos",
    accent: "bg-[#1f6f43]",
    items: categoriasPrecios[2].items,
  },
  {
    title: "Pollo",
    subtitle: "Variedad para el día a día",
    accent: "bg-[#b51f2d]",
    items: categoriasPrecios[0].items.slice(0, 4),
  },
];

export default function CarniceriaLanding() {
  const [precioIndex, setPrecioIndex] = useState(0);
  const [ofertaIndex, setOfertaIndex] = useState(0);

  const ofertasVisiblesDesktop = 3;
  const maxOfertaIndex = Math.max(ofertas.length - ofertasVisiblesDesktop, 0);
  const precioActual = categoriasPrecios[precioIndex];

  const ofertasMostradas = useMemo(
    () => ofertas.slice(ofertaIndex, ofertaIndex + ofertasVisiblesDesktop),
    [ofertaIndex]
  );

  useEffect(() => {
    if (ofertas.length <= ofertasVisiblesDesktop) return;

    const interval = setInterval(() => {
      setOfertaIndex((prev) => (prev >= maxOfertaIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [maxOfertaIndex]);

  const circularIndex = (index: number, length: number) =>
    (index + length) % length;

  const changePrecio = (step: number) => {
    setPrecioIndex((prev) =>
      circularIndex(prev + step, categoriasPrecios.length)
    );
  };

  const changeOferta = (step: number) => {
    setOfertaIndex((prev) => circularIndex(prev + step, maxOfertaIndex + 1));
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5f0f16] via-[#8f1823] to-[#1f6f43] text-white">
        <div className="absolute inset-0 bg-black/20" />

     <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
 <div className="mb-8 flex justify-center md:justify-start">
    <Image
      src="/logo.png"
      alt="Logo Carnicería Norte"
      width={1536}
      height={1024}
      priority
      className="h-auto w-[180px] object-contain sm:w-[220px] md:w-[280px] lg:w-[320px]"
    />
  </div>

  <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
    <div>
      <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm backdrop-blur">
        Calidad, frescura y buenos precios
      </span>

      <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
        La mejor carne para tu mesa, todos los días.
      </h1>

     

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-white px-6 py-3 font-semibold text-[#7c111d] shadow-lg transition hover:scale-[1.02]"
        >
          Consultar por WhatsApp
        </a>

        <a
          href="#cortes"
          className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:cursor-pointer hover:bg-white/10"
        >
          Ver cortes
        </a>

        <a
          href="#ofertas"
          className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:cursor-pointer hover:bg-white/10"
        >
          Ver ofertas
        </a>
      </div>
    </div>

            <div>
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
                <div className="rounded-[1.5rem] bg-white p-5 text-zinc-900 md:p-6">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                    <div>
                      <p className="text-sm font-medium text-[#1f6f43]">
                        Destacado de la semana
                      </p>
                      <h2 className="text-2xl font-bold text-[#7c111d]">
                        Oferta Vacuno
                      </h2>
                    </div>

                    <span className="rounded-full bg-[#1f6f43] px-4 py-1 text-sm font-semibold text-white">
                      Oferta
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm md:text-base">
                    <ItemPromo nombre="Falda" detalle="Incluida" />
                    <ItemPromo nombre="Aguja" detalle="Incluida" />
                    <ItemPromo nombre="Bocado" detalle="Incluido" />
                    <ItemPromo
                      nombre="Chorizo y morcilla"
                      detalle="Incluidos"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#7c111d] px-5 py-4 text-white">
                    <span className="text-lg font-medium">Precio promo</span>
                    <span className="text-2xl font-black">$36.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cortes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="rounded-full bg-[#f5e9ea] px-4 py-1 text-sm font-semibold text-[#7c111d]">
            Nuestros productos
          </span>

       

        
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {resumenCategorias.map((categoria) => (
            <CategoryCard key={categoria.title} {...categoria} />
          ))}
        </div>
      </section>

      <section className="bg-[#fff8f8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="rounded-full bg-[#e9f5ee] px-4 py-1 text-sm font-semibold text-[#1f6f43]">
                Precios de referencia
              </span>

              <h2 className="mt-4 text-3xl font-black md:text-4xl">
                {precioActual.titulo}
              </h2>
            </div>

           
          </div>

          <div className="mt-10">
            <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm md:rounded-[2rem]">
              <div
                className={`${precioActual.color} grid grid-cols-2 px-4 py-4 text-sm font-semibold uppercase tracking-wide text-white md:px-6 md:text-base`}
              >
                <span>Corte</span>
                <span className="text-right">Precio</span>
              </div>

              {precioActual.items.map((item) => (
                <div
                  key={`${precioActual.titulo}-${item.nombre}`}
                  className="grid grid-cols-2 border-t border-zinc-100 px-4 py-4 text-sm md:px-6 md:text-base"
                >
                  <span className="pr-3">{item.nombre}</span>
                  <span className="text-right font-bold text-[#1f6f43]">
                    {item.precio}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <ArrowButton
                onClick={() => changePrecio(-1)}
                label="Ver categoría anterior"
              >
                ←
              </ArrowButton>

              <ArrowButton
                onClick={() => changePrecio(1)}
                label="Ver categoría siguiente"
              >
                →
              </ArrowButton>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {categoriasPrecios.map((categoria, index) => (
              <button
                key={categoria.titulo}
                type="button"
                onClick={() => setPrecioIndex(index)}
                className={`h-3 rounded-full transition-all hover:cursor-pointer ${
                  precioIndex === index ? "w-10 bg-[#7c111d]" : "w-3 bg-zinc-300"
                }`}
                aria-label={categoria.titulo}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="ofertas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="rounded-full bg-[#f5e9ea] px-4 py-1 text-sm font-semibold text-[#7c111d]">
            Promociones
          </span>

        
        </div>

        <div className="mt-10 hidden items-center gap-6 md:flex">
          {ofertas.length > ofertasVisiblesDesktop && (
            <ArrowButton
              onClick={() => changeOferta(-1)}
              label="Ver ofertas anteriores"
            >
              ←
            </ArrowButton>
          )}

          <div className="grid flex-1 gap-6 md:grid-cols-3">
            {ofertasMostradas.map((oferta) => (
              <OfertaCard key={oferta.titulo} oferta={oferta} />
            ))}
          </div>

          {ofertas.length > ofertasVisiblesDesktop && (
            <ArrowButton onClick={() => changeOferta(1)} label="Ver más ofertas">
              →
            </ArrowButton>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:hidden">
          {ofertas.map((oferta) => (
            <OfertaCard key={oferta.titulo} oferta={oferta} />
          ))}
        </div>

        {ofertas.length > ofertasVisiblesDesktop && (
          <div className="mt-6 hidden justify-center gap-2 md:flex">
            {Array.from({ length: maxOfertaIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setOfertaIndex(index)}
                className={`h-3 rounded-full transition-all hover:cursor-pointer ${
                  ofertaIndex === index ? "w-10 bg-[#1f6f43]" : "w-3 bg-zinc-300"
                }`}
                aria-label={`Ir al grupo de ofertas ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-[#1f6f43] via-[#7c111d] to-[#b51f2d] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:px-10">
          <div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/30 px-4 py-1 text-sm font-semibold transition hover:cursor-pointer hover:bg-white/10"
            >
              Ubicación
            </a>

            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Vení a visitarnos
            </h2>

            <div className="mt-6 space-y-4 text-white/90">
              <p>
                <strong>Dirección:</strong> Domingo Cabrera 20 (frente al estadio
                Fuhad Cordi)
              </p>
              <p>
                <strong>Horarios:</strong> Lunes a sábados de 8:30 a 13:00 y de
                19:00 a 21:00
              </p>
              <p>
                <strong>Domingos:</strong> de 10:00 a 13:00
              </p>
              <p>
                <strong>Teléfono:</strong> +54 9 3521 466165
              </p>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-[#7c111d] shadow-lg transition hover:scale-[1.02]"
            >
              Pedir información
            </a>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="block rounded-[2rem] bg-white/10 p-3 backdrop-blur transition hover:cursor-pointer hover:bg-white/15 md:p-4"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/5 p-2">
              <div className="mx-auto w-full max-w-[620px]">
                <Image
                  src="/carniceria.png"
                  alt="Foto del local de Carnicería Norte"
                  width={1043}
                  height={848}
                  className="h-auto w-full rounded-[1rem] object-contain"
                />
              </div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

function ArrowButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative z-20 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-zinc-300 bg-white text-xl font-bold text-[#7c111d] shadow-sm transition active:scale-95 hover:cursor-pointer md:h-12 md:w-12 md:text-2xl"
    >
      {children}
    </button>
  );
}

function ItemPromo({ nombre, detalle }: { nombre: string; detalle: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
      <span>{nombre}</span>
      <span className="font-semibold">{detalle}</span>
    </div>
  );
}

function OfertaCard({ oferta }: { oferta: Oferta }) {
  return (
    <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="inline-flex rounded-full bg-[#1f6f43] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        Oferta especial
      </div>

      <h3 className="mt-4 text-2xl font-black text-[#7c111d]">
        {oferta.titulo}
      </h3>

      <p className="mt-3 text-zinc-600">{oferta.descripcion}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-zinc-500">Precio final</span>
        <span className="text-right text-3xl font-black text-[#1f6f43]">
          {oferta.precio}
        </span>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: Corte[];
  accent: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={`${accent} px-6 py-5 text-white`}>
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-1 text-sm text-white/85">{subtitle}</p>
      </div>

      <div className="space-y-3 p-6">
        {items.map((item) => (
          <div
            key={item.nombre}
            className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3"
          >
            <span className="font-medium text-zinc-700">{item.nombre}</span>
            <span className="text-right font-bold text-[#1f6f43]">
              {item.precio}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
