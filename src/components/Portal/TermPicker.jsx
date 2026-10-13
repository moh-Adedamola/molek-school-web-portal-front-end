import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Label, Field } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

/** Accessible term chooser (Headless UI Listbox). `groups` from groupGradesByTerm. */
const TermPicker = ({ groups, value, onChange }) => (
    <Field className="w-full sm:w-80">
        <Label className="block font-semibold text-[#1F3B6B] mb-1">Term</Label>
        <Listbox value={value} onChange={onChange} by="key">
            <ListboxButton className="relative w-full min-h-12 rounded-xl border-2 border-gray-300 bg-white py-2.5 pl-4 pr-10 text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]">
                {value ? `${value.termName}, ${value.sessionName}` : 'Choose a term'}
                <ChevronDown aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1F3B6B]" />
            </ListboxButton>
            <ListboxOptions anchor="bottom start"
                className="z-40 mt-1 w-[var(--button-width)] max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg focus:outline-none">
                {groups.map((g) => (
                    <ListboxOption key={g.key} value={g}
                        className="group flex cursor-pointer items-center gap-2 px-4 py-3 data-[focus]:bg-[#F9D89C]/60">
                        <Check aria-hidden="true" className="h-5 w-5 invisible text-[#1F3B6B] group-data-[selected]:visible" />
                        <span>{g.termName}, {g.sessionName}{g.className ? ` (${g.className})` : ''}</span>
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    </Field>
);

export default TermPicker;
