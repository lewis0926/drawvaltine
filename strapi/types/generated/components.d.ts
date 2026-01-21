import type { Schema, Struct } from '@strapi/strapi';

export interface ObjectsArtwork extends Struct.ComponentSchema {
  collectionName: 'components_objects_artworks';
  info: {
    displayName: 'Artwork';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'objects.artwork': ObjectsArtwork;
    }
  }
}
