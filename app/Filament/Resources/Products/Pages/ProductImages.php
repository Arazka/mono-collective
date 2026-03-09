<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Storage;

class ProductImages extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $navigationLabel = 'Add Images';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    public function form(Schema $schema): Schema
    {
        return
            $schema->components([
                Repeater::make('images')
                    ->relationship('images')
                    ->schema([
                        FileUpload::make('image')
                            ->directory('products')
                            ->disk('public')
                            ->image()
                            ->maxSize(1024)
                            ->required()
                            ->columnSpanFull()
                            ->deleteUploadedFileUsing(function (string $file) {
                                if ($file) {
                                    Storage::disk('public')->delete($file);
                                }
                            })
                    ])
                    ->orderColumn('sort_order')
                    // ->reorderable(false)
                    ->minItems(1)
                    ->maxItems(5)
                    ->columnSpanFull()
                    ->grid(2)

                // ->afterStateHydrated(function ($state, callable $set) {
                //     if (!$state) {
                //         $set('images', [
                //             ['image' => null],
                //         ]);
                //     }
                // })
            ]);
    }
}
