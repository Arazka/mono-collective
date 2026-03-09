<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\View\Components\BadgeComponent;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->searchable(),
                TextColumn::make('order_date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('order_code')
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn(int $state): string => match ($state) {
                        1 => 'warning',   // Pending
                        2 => 'info',      // Processing
                        3 => 'purple',    // Shipped
                        4 => 'success',   // Completed
                        5 => 'danger',    // Cancelled
                        default => 'gray',
                    })
                    ->formatStateUsing(fn(int $state): string => match ($state) {
                        1 => 'Pending',
                        2 => 'Processing',
                        3 => 'Shipped',
                        4 => 'Completed',
                        5 => 'Cancelled',
                        default => 'Unknown',
                    })
                    ->searchable(),
                TextColumn::make('subtotal')
                    ->numeric(),
                TextColumn::make('shipping_cost')
                    ->numeric(),
                TextColumn::make('tax')
                    ->numeric(),
                TextColumn::make('grand_total')
                    ->numeric(),
                TextColumn::make('resi_code')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
