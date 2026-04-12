import { useState, useRef, useEffect, InputHTMLAttributes } from 'react';
import TextInput from './TextInput';

export const ILOILO_MUNICIPALITIES = [
    "Passi City", "San Enrique", "Dueñas", "Calinog", "Bingawan", "Lambunao", 
    "Badiangan", "Janiuay", "Maasin", "Pototan", "Dingle", "Mina", "Cabatuan", 
    "New Lucena", "Santa Barbara", "Zarraga", "Pavia", "Leganes", "Iloilo City", 
    "Oton", "San Miguel", "Alimodian", "Leon", "Tigbauan", "Guimbal", "Tubungan", 
    "Igbaras", "Miagao", "San Joaquin", "Dumangas", "Barotac Nuevo", "Anilao", 
    "Banate", "Barotac Viejo", "San Rafael", "Ajuy", "Sara", "Lemery", "Concepcion", 
    "San Dionisio", "Batad", "Balasan", "Estancia", "Carles"
].sort();

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string;
    value: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name?: string;
}

export default function MunicipalitySelect({ className = '', value, onChange, name = 'municipality', ...props }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync searchTerm with value prop
    useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    const filteredMunicipalities = ILOILO_MUNICIPALITIES.filter(muni =>
        muni.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (muni: string) => {
        setSearchTerm(muni);
        onChange({ target: { name, value: muni } });
        setIsOpen(false);
    };

    const handleClear = () => {
        setSearchTerm('');
        onChange({ target: { name, value: '' } });
        setIsOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchTerm(val);
        onChange({ target: { name, value: val } });
        setIsOpen(true);
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            // If opening, show all options by clearing search term temporarily or selecting all
            // But usually, clicking the arrow means "show me everything"
            setSearchTerm(''); // This acts as "Show All"
        }
        setIsOpen(!isOpen);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm(value || ''); // Restore original value on blur
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchTerm, value]);

    return (
        <div className={"relative " + className} ref={containerRef}>
            <div className="relative group">
                <TextInput
                    {...props}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={(e) => {
                        setIsOpen(true);
                        e.target.select();
                    }}
                    className="w-full pr-16"
                    placeholder="Search municipality..."
                    autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                            title="Clear selection"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-all duration-200"
                    >
                        <svg className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 max-h-60 overflow-hidden flex flex-col border border-gray-100 animate-in fade-in zoom-in duration-200">
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
                        <ul className="py-2 text-sm text-gray-700">
                            {filteredMunicipalities.length > 0 ? (
                                filteredMunicipalities.map((muni) => (
                                    <li
                                        key={muni}
                                        onClick={() => handleSelect(muni)}
                                        className={`cursor-pointer select-none px-4 py-2.5 mx-1 rounded-lg transition-all duration-150 ${
                                            muni === value 
                                            ? 'bg-indigo-600 text-white shadow-md' 
                                            : 'hover:bg-indigo-50 hover:text-indigo-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{muni}</span>
                                            {muni === value && (
                                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-8 text-center text-gray-400">
                                    <svg className="mx-auto h-8 w-8 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <p className="text-xs uppercase tracking-wider font-semibold">No matches found</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    {searchTerm && (
                        <div className="px-3 py-2 bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-100 font-medium">
                            Filtering by: {searchTerm}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
