import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAllDados } from "@/services/dadoService";
import { baixarCSV } from "@/services/downloadservice";
import Pagination from "./Pagination";

interface DadoMeteorologico {
  reading_time: string;
  temp: number;
  hum: number;
  cab_temp: number;
  bat_volts: number;
  uv_level: number;
  bar: number;
  wind_peak: number;
  wind_rt: number;
  wind_avg: number;
  wind_dir_rt: number;
  wind_dir_avg: number;
}

interface WeatherTableProps {
  className?: string;
}

export default function WeatherTable({ className }: WeatherTableProps) {
  const [data, setData] = useState<DadoMeteorologico[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await getAllDados();
        setData(dados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function handleDownload() {
    try {
      await baixarCSV();
    } catch (error) {
      alert("Erro ao baixar o arquivo CSV.");
    }
  }

  // ✅ Controle de transição de página (fade-out + update + fade-in)
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFading(false);
    }, 200); // tempo da transição
  };

  return (
    <div className={cn("rounded-xl border-2 border-black bg-white shadow-sm", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-3">
        <button
          onClick={handleDownload}
          className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition"
        >
          Baixar CSV
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="itemsPerPage">Registros por página:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              handlePageChange(1);
            }}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            {[5, 10, 25, 50, 100].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="sticky top-0 z-10 bg-gray-50 text-gray-600 font-semibold shadow-sm">
            <tr>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-right">Temp. Ar (°C)</th>
              <th className="px-4 py-3 text-right">Umidade (%)</th>
              <th className="px-4 py-3 text-right">Temp. Cabine (°C)</th>
              <th className="px-4 py-3 text-right">Bateria (V)</th>
              <th className="px-4 py-3 text-right">UV (W/m²)</th>
              <th className="px-4 py-3 text-right">Pressão (hPa)</th>
              <th className="px-4 py-3 text-right">Pico Vento (m/s)</th>
              <th className="px-4 py-3 text-right">Vento (m/s)</th>
              <th className="px-4 py-3 text-right">Vento Médio (m/s)</th>
              <th className="px-4 py-3 text-right">Dir. Vento (°)</th>
              <th className="px-4 py-3 text-right">Dir. Média (°)</th>
            </tr>
          </thead>
        </table>

        <div className="max-h-[60vh] overflow-y-auto">
          <div
            className={cn(
              "transition-opacity duration-200",
              isFading ? "opacity-0" : "opacity-100"
            )}
          >
            <table className="min-w-full text-sm text-left text-gray-800">
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-left whitespace-nowrap">
                      {new Date(item.reading_time).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 text-right">{item.temp}</td>
                    <td className="px-4 py-2 text-right">{item.hum}</td>
                    <td className="px-4 py-2 text-right">{item.cab_temp}</td>
                    <td className="px-4 py-2 text-right">{item.bat_volts}</td>
                    <td className="px-4 py-2 text-right">{item.uv_level}</td>
                    <td className="px-4 py-2 text-right">{item.bar}</td>
                    <td className="px-4 py-2 text-right">{item.wind_peak}</td>
                    <td className="px-4 py-2 text-right">{item.wind_rt}</td>
                    <td className="px-4 py-2 text-right">{item.wind_avg}</td>
                    <td className="px-4 py-2 text-right">{item.wind_dir_rt}</td>
                    <td className="px-4 py-2 text-right">{item.wind_dir_avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
