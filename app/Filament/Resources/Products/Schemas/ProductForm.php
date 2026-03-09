<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\ProductStatus;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    // ->description('Basic Information Basic Information Basic Information Basic Information')
                    // ->aside()
                    ->schema([
                        Grid::make()
                            ->columns(2)
                            ->schema([
                                TextInput::make('name')->string()->maxLength(100)->required(),
                                Select::make('category_id')->relationship('category', 'name')->required(),
                                TextInput::make('price')->numeric()->required()->prefix('IDR'),
                                Select::make('status')
                                    ->options(ProductStatus::class)
                                    ->default('draft')
                                    ->visibleOn('edit')
                                    ->required(),

                            ]),
                        Textarea::make('excerpt')->string()->maxLength(100)->required(),
                        RichEditor::make('description')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                                'link',
                                'attachFiles',
                                'table',
                            ])
                            ->columnSpanFull()
                            ->required(),
                    ])
                    ->columnSpanFull()
            ]);
    }
}
