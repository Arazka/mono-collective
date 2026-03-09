<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ProductVariants extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $navigationLabel = 'Add Variants';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    public function form(Schema $schema): Schema
    {
        return
            $schema->components([
                Repeater::make('variants')
                    ->relationship('variants')
                    ->table([
                        TableColumn::make('Size'),
                        TableColumn::make('Stock'),
                        TableColumn::make('Weight'),
                        TableColumn::make('Price'),
                    ])
                    ->schema([
                        TextInput::make('size')->required(),
                        TextInput::make('stock')->numeric()->required(),
                        TextInput::make('weight')->numeric()->required()->suffix('gram'),
                        TextInput::make('price')->numeric()->required()->prefix('IDR'),

                    ])
                    ->reorderable(false)
                    ->columnSpanFull()
                    ->minItems(1)
                    ->afterStateHydrated(function ($state, callable $set) {
                        if (!$state) {
                            $set('variants', [
                                [
                                    'size' => null,
                                    'stock' => null,
                                    'weight' => null,
                                    'price' => null,
                                ],
                            ]);
                        }
                    })
            ]);
    }
}
