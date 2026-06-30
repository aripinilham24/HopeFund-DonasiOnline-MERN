import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const categories = [
  { value: "kesehatan", label: "Kesehatan" },
  { value: "pendidikan", label: "Pendidikan" },
  { value: "lingkungan", label: "Lingkungan" },
  { value: "hewan", label: "Hewan" },
  { value: "darurat", label: "Darurat" },
];

export function CampaignForm({
  title,
  submitText,
  onSubmit,
  preview,
  onImageChange,
  isSubmitting,
  imageRequired = true,
  defaultValues = {},
}) {
  return (
    <form onSubmit={onSubmit} className="bg-card shadow-lg rounded-lg p-6 sm:p-8 border">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-foreground mb-8">
        {title}
      </h1>

      <div className="mb-6">
        <Label htmlFor="title-campaign">Judul Campaign</Label>
        <Input
          type="text"
          name="title-campaign"
          id="title-campaign"
          placeholder="Contoh: Bantu Anak Yatim untuk Sekolah"
          required
          defaultValue={defaultValues.title}
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="deskripsi-campaign">Deskripsi Singkat</Label>
        <Input
          type="text"
          name="deskripsi-campaign"
          id="deskripsi-campaign"
          placeholder="Ringkasan campaign dalam satu kalimat"
          required
          defaultValue={defaultValues.shortDescription}
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="detail-campaign">Detail Campaign</Label>
        <textarea
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm resize-y"
          name="detail-campaign"
          id="detail-campaign"
          placeholder="Tulis detail lengkap campaign di sini..."
          required
          defaultValue={defaultValues.description}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="deadline">Batas Waktu</Label>
          <Input
            type="date"
            name="deadline"
            id="deadline"
            required
            defaultValue={defaultValues.deadline}
          />
        </div>

        <div>
          <Label htmlFor="target-dana">Target Dana (Rp)</Label>
          <Input
            type="number"
            name="target-dana"
            id="target-dana"
            placeholder="5000000"
            min="0"
            required
            defaultValue={defaultValues.targetAmount}
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="image-campaign">Foto Campaign</Label>
        <Input
          type="file"
          name="image-campaign"
          id="image-campaign"
          accept="image/*"
          onChange={onImageChange}
          required={imageRequired}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
        />
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="preview"
              className="w-full max-w-md h-64 object-cover rounded-lg shadow-md mx-auto"
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <Label htmlFor="category" className="mb-2 block">Kategori Campaign</Label>
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          name="category"
          id="category"
          defaultValue={defaultValues.category || ""}
          required
        >
          <option value="" disabled>Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Spinner /> Memproses...
          </span>
        ) : (
          submitText
        )}
      </Button>
    </form>
  );
}
