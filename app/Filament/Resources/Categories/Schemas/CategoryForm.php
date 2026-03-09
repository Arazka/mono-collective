<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->maxLength(50)
                    ->string()
                    ->unique()
                    ->required(),
                FileUpload::make('image')
                    ->directory('categories')
                    ->disk('public')
                    ->image()
                    ->maxSize(1024)
                    ->required()
                    ->deleteUploadedFileUsing(function (string $file) {
                        if ($file) {
                            Storage::disk('public')->delete($file);
                        }
                    })
            ]);
    }
}
