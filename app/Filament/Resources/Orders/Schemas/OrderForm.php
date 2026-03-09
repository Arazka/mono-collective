<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Select::make('user_id')
                //     ->relationship('user', 'name')
                //     ->required(),
                // DateTimePicker::make('order_date'),
                // TextInput::make('order_code'),
                // TextInput::make('shipping_method_detail'),
                // TextInput::make('shipping_address_detail'),
                // TextInput::make('subtotal')
                //     ->numeric()
                //     ->default(0.0),
                // TextInput::make('shipping_cost')
                //     ->numeric()
                //     ->default(0.0),
                // TextInput::make('tax')
                //     ->numeric()
                //     ->default(0.0),
                // TextInput::make('grand_total')
                //     ->numeric()
                //     ->default(0.0),
                Hidden::make('status')->default(1),
                TextInput::make('resi_code')
                    ->afterStateUpdated(function (Set $set, $state, $get) {
                        if (!empty($state)) {
                            $currentStatus = $get('status');

                            if (in_array($currentStatus, [1, 2])) {
                                $set('status', 3);
                            }
                        } else {
                            $currentStatus = $get('status');
                            if ($currentStatus == 3) {
                                $set('status', 2);
                            }
                        }
                    })
                // Textarea::make('notes')
                //     ->columnSpanFull(),
            ]);
    }
}
