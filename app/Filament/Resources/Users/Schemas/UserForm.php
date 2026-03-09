<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->maxLength(255)
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->maxLength(255)
                    ->email()
                    ->required(),
                Select::make('role')
                    ->relationship('roles', 'name')
                    ->required(),
                TextInput::make('password')
                    ->minLength(9)
                    ->maxLength(255)
                    ->helperText('Minimum 9 caharacters')
                    ->revealable()
                    ->password()
                    ->required(),
            ]);
    }
}
