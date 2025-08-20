"use client";
import { useForm } from "react-hook-form";

type FormData = {
  locationName: string;
  label: string;
  type?: string;
  serial?: string;
  inspector: string;
  status: string;
  notes?: string;
};

export default function NewItemPage() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(data),
    });
    alert("Item enregistré !");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem" }}>
      <h1>Nouvel Item + Inspection</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Lieu" {...register("locationName")} /><br/>
        <input placeholder="Étiquette de l’item" {...register("label")} /><br/>
        <input placeholder="Type" {...register("type")} /><br/>
        <input placeholder="No de série" {...register("serial")} /><br/>
        <input placeholder="Inspecteur" {...register("inspector")} /><br/>
        <select {...register("status")}>
          <option value="OK">OK</option>
          <option value="A corriger">À corriger</option>
          <option value="Urgent">Urgent</option>
        </select><br/>
        <textarea placeholder="Notes" {...register("notes")} /><br/>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
