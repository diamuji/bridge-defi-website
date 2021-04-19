import React, { useState } from 'react';
import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';

export default function TableCustomers() {
    const [open, setOpen] = useState(false);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell header>
                        <div className="flex items-center">
                            <label className="inline-flex">
                                <span className="sr-only">Select all</span>
                                {/* <input className="form-checkbox" type="checkbox" x-ref="parentCheckbox" @click="toggleAll()" /> */}
                            </label>
                        </div>
                    </TableCell>
                    <TableCell header>
                        <span className="sr-only">Favourite</span>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold text-left">Order</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold text-left">Email</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold text-left">Location</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold">Orders</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold text-left">Last order</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold text-left">Total spent</div>
                    </TableCell>
                    <TableCell header>
                        <div className="font-semibold">Refunds</div>
                    </TableCell>
                    <TableCell header>
                        <span className="sr-only">Menu</span>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* Row */}
                <TableRow>
                    <TableCell>
                        <label className="inline-flex">
                            <span className="sr-only">Select</span>
                            {/* <input className="table-item form-checkbox" type="checkbox" @click="uncheckParent()" /> */}
                        </label>
                    </TableCell>
                    <TableCell>
                        <button>
                            <svg className="w-4 h-4 flex-shrink-0 fill-current text-yellow-500" viewBox="0 0 16 16">
                                <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
                            </svg>
                        </button>
                    </TableCell>
                    <TableCell>
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src="../images/user-40-06.jpg" width="40" height="40" alt="User 06" />
                        </div>
                        <div className="font-medium text-gray-800">Tisho Yanchev</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-left">tisho.y@kurlytech.com</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-left">London, UK</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">14</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-left font-medium text-light-blue-500">#896644</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-left font-medium text-green-500">$1,649.99</div>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">1</div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center relative" x-data="{ open: false }">
                            <button
                                className="text-gray-400 hover:text-gray-500 rounded-full"
                                // :className="{ 'bg-gray-100 text-gray-500': open }"
                                aria-haspopup="true"
                            // @click.prevent="open = !open"
                            // :aria-expanded="open"
                            >
                                <span className="sr-only">Menu</span>
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="2" />
                                    <circle cx="10" cy="16" r="2" />
                                    <circle cx="22" cy="16" r="2" />
                                </svg>
                            </button>
                            <div
                                className="origin-top-right z-10 absolute top-full right-0 min-w-36 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                            // @click.away="open = false"
                            // @keydown.escape.window="open = false"
                            // x-show="open"
                            // x-transition:enter="transition ease-out duration-200 transform"
                            // x-transition:enter-start="opacity-0 -translate-y-2"
                            // x-transition:enter-end="opacity-100 translate-y-0"
                            // x-transition:leave="transition ease-out duration-200"
                            // x-transition:leave-start="opacity-100"
                            // x-transition:leave-end="opacity-0"
                            // x-cloak                
                            >
                                <ul>
                                    <li>
                                        <a
                                            className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                                            href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                        >
                                            Option 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                                            href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                        >
                                            Option 2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                                            href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}