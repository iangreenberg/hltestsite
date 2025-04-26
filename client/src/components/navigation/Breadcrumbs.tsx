import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  className?: string;
  customItems?: BreadcrumbItem[];
  showHomeLink?: boolean;
}

export function Breadcrumbs({ 
  className = '', 
  customItems,
  showHomeLink = true 
}: BreadcrumbsProps) {
  const [location] = useLocation();
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  
  useEffect(() => {
    if (customItems) {
      setItems(customItems);
      return;
    }
    
    const pathSegments = location.split('/').filter(Boolean);
    let currentPath = '';
    
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (showHomeLink) {
      breadcrumbs.push({ name: 'Home', path: '/' });
    }
    
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Convert path segment to readable format (e.g., "brand-development" to "Brand Development")
      const readableName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({ name: readableName, path: currentPath });
    });
    
    setItems(breadcrumbs);
  }, [location, customItems, showHomeLink]);
  
  if (items.length <= 1 && !customItems) return null;
  
  return (
    <nav className={`flex items-center text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-primary">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}