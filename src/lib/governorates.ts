import { Governorate } from "@/types";

export const GOVERNORATES: Governorate[] = [
  {
    id: "sharqia",
    nameAr: "الشرقية (الزقازيق والمراكز)",
    nameEn: "Sharqia (Zagazig & Centers)",
    shippingFeeEgp: 40,
    etaAr: "24 ساعة",
    etaEn: "24 Hours",
  },
  {
    id: "cairo",
    nameAr: "القاهرة الكبرى",
    nameEn: "Greater Cairo",
    shippingFeeEgp: 60,
    etaAr: "1 - 2 يوم عمل",
    etaEn: "1 - 2 Business Days",
  },
  {
    id: "giza",
    nameAr: "الجيزة",
    nameEn: "Giza",
    shippingFeeEgp: 60,
    etaAr: "1 - 2 يوم عمل",
    etaEn: "1 - 2 Business Days",
  },
  {
    id: "alexandria",
    nameAr: "الإسكندرية",
    nameEn: "Alexandria",
    shippingFeeEgp: 65,
    etaAr: "2 - 3 أيام عمل",
    etaEn: "2 - 3 Business Days",
  },
  {
    id: "delta",
    nameAr: "محافظات الدلتا (الدقهلية، الغربية، المنوفية، القليوبية، كفر الشيخ، البحيرة، دمياط)",
    nameEn: "Nile Delta Governorates",
    shippingFeeEgp: 60,
    etaAr: "1 - 2 يوم عمل",
    etaEn: "1 - 2 Business Days",
  },
  {
    id: "canal",
    nameAr: "مدن القناة (الإسماعيلية، بورسعيد، السويس)",
    nameEn: "Suez Canal Cities",
    shippingFeeEgp: 65,
    etaAr: "1 - 2 يوم عمل",
    etaEn: "1 - 2 Business Days",
  },
  {
    id: "upper_egypt",
    nameAr: "محافظات الصعيد والبحر الأحمر",
    nameEn: "Upper Egypt & Red Sea",
    shippingFeeEgp: 80,
    etaAr: "2 - 4 أيام عمل",
    etaEn: "2 - 4 Business Days",
  },
];

export function getGovernorateById(id: string): Governorate {
  return GOVERNORATES.find((g) => g.id === id) || GOVERNORATES[0];
}
