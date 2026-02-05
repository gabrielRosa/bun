'use client';

import Link from "next/link";
import Image from 'next/image';
import styles from "./Navbar.module.scss";
import { AutoComplete, type AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";
import type { IEvent } from "@/models/event.model";

export default function Navbar() {
  const [value, setValue] = useState<IEvent | string>('');
  const [items, setItems] = useState<IEvent[]>([]);

  const search = async (event: AutoCompleteCompleteEvent) => {
    try {
      const response = await fetch(`/api/v1/events/?q=${event.query}`);
      const data = await response.json();

      setItems(data.hits || []);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setItems([]);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo/camotim_2_pq.png"
          alt="Back to Home"
          width={150}
          height={50}
          priority
        />
      </Link>
      <AutoComplete
          id="event-search"
          value={value}
          suggestions={items}
          completeMethod={search}
          field="name"
          onChange={(e) => setValue(e.value)}
          placeholder="Enter the event name..."
          itemTemplate={(item: IEvent) => (
            <div className="flex flex-col">
              <span className="font-semibold" dangerouslySetInnerHTML={{ __html: item?._formatted.name }}></span>
              <small className="text-gray-500">&nbsp;{item.region}</small>
            </div>
          )}
        />

    </nav>
  );
}
